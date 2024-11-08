import axios from "axios";
import { BACKEND_URL } from "../../pages/config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateEcho } from "@ronibhakta/nexxus-common";
import {
  BrainCircuit,
  CalendarCheck,
  ImageIcon,
  MapPinned,
  Smile,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast"; // Assuming you have a toast hook

export const PostEchos = () => {
  const navigate = useNavigate();
  const [echos, setEchos] = useState<CreateEcho>({
    content: "",
  });
  const [open, setOpen] = useState(false);
  const [generatedSuggestions, setGeneratedSuggestions] = useState<string[]>(
    [],
  );

  const pushtoast = (content: string) => {
    localStorage.setItem("showToast", "true");
    localStorage.setItem("toastContent", content);
    window.location.reload();
  };

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/echo`, echos, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        pushtoast(response.data.content);
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  async function generateRecommendations() {
    if (
      !echos.content ||
      echos.content.trim().length < 2 ||
      echos.content.trim().length > 400
    ) {
      toast({
        title: "Invalid input",
        description: "Content must be between 2 and 400 characters.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/echo/genaratesuggestionsgimini`,
        echos,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      );
      if (
        response.status === 200 &&
        response.data.suggestions &&
        response.data.suggestions.length > 0
      ) {
        setGeneratedSuggestions(response.data.suggestions);
        setOpen(true);
      } else {
        toast({
          title: "No suggestions generated",
          description: "Please try again.",
          variant: "default",
        });
      }
    } catch (e) {
      if ((e as any).response && (e as any).response.status === 400) {
        toast({
          title: "Error",
          description: (e as any).response.data.alert,
          variant: "destructive",
        });
      } else {
        console.log(e);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
        navigate("/nexxus");
      }
    }
  }

  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex">
        <img
          src={
            "https://media.licdn.com/dms/image/v2/D4D03AQEvEHK2KOMLwQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705087348506?e=1735776000&v=beta&t=r3U2Inqk6qyq18y_rCXFlnuoxD4CRcMrJHPFOx2O5oE"
          }
          alt="User"
          className="w-12 h-12 rounded-full mr-3"
        />
        <div className="flex-1">
          <Echosposter1
            onChange={(e) => {
              setEchos({
                ...echos,
                content: e.target.value,
              });
            }}
            value={echos.content}
          />
          <div className="flex justify-between items-center">
            <div className="flex col-span-3 space-x-2">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={generateRecommendations}
                    disabled={
                      !echos.content ||
                      echos.content.trim().length < 2 ||
                      echos.content.trim().length > 400
                    }
                  >
                    <BrainCircuit />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white">
                  <DialogHeader>
                    <DialogTitle>Generated Suggestions</DialogTitle>
                  </DialogHeader>
                  <RadioGroup
                    value={echos.content}
                    onValueChange={(value: any) => {
                      setEchos({ ...echos, content: value });
                      setOpen(false);
                    }}
                    className="gap-4"
                  >
                    {generatedSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={suggestion}
                          id={`suggestion-${index}`}
                          className="h-4 w-4 border border-gray-600 text-blue-400 focus:ring-blue-400 focus:ring-offset-gray-900"
                        />
                        <Label
                          htmlFor={`suggestion-${index}`}
                          className="text-sm leading-relaxed cursor-pointer text-gray-300"
                        >
                          {suggestion}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </DialogContent>
              </Dialog>
              <button>
                <ImageIcon />
              </button>
              <button>
                <Smile />
              </button>
              <button>
                <CalendarCheck />
              </button>
              <button>
                <MapPinned />
              </button>
            </div>
            <button
              onClick={sendRequest}
              className="bg-blue-400 text-white rounded-full px-4 py-2 font-bold"
            >
              Echo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface echosposter1Type {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Echosposter1 = ({ onChange, value }: echosposter1Type) => {
  return (
    <div className="border border-slate-700 rounded-md mb-3 ">
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder=" What's happening?"
        className="bg-transparent  text-gray-300 text-xl w-full p-1.5 hover:bg-slate-900 rounded-md -mr-9 focus:outline-none"
      />
    </div>
  );
};
