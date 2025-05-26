import openai

openai.api_key = "8FCgmct0IpMghhnjqtp2356eV9UvAyDw9qWIokeCMLec5fKNny0BJQQJ99BEAC77bzfXJ3w3AAAAACOGCSgs"
openai.api_base = "https://roni-masjfh4x-southindia.openai.azure.com/"
openai.api_type = "azure"
openai.api_version = "2024-12-01-preview"

try:
    response = openai.ChatCompletion.create(
        deployment_id="gpt-4o",
        messages=[{"role": "user", "content": "Hello, Azure OpenAI!"}],
    )
    print("Test Successful:", response)
except Exception as e:
    print("Test Failed:", e)
