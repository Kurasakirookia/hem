from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Every table subclasses this. Models land here as they are needed."""
