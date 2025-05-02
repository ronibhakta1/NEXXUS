from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from AZURE_layer2.database import Base


class EchoContentFlagdata(Base):
    __tablename__ = "echocontentflagdata"

    id = Column(Integer, primary_key=True, index=True)
    echoId = Column(Integer, ForeignKey("echo.id"), unique=True, nullable=False)
    sentiment = Column(String, nullable=False)  # 'neg', 'pos', 'neutral'
    extraData = Column(JSON, nullable=True)

    echo = relationship("Echo", back_populates="flagData")
