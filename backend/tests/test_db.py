from collections.abc import Generator

import pytest
from sqlalchemy.orm import Session

from app.db import get_db


def _open_session_with_close_spy() -> tuple[Generator[Session], Session, list[str]]:
    """Starts the get_db dependency and records whether it closed the session.

    No database is needed. A SQLAlchemy session only connects on its first
    query, and these tests never query.
    """
    gen = get_db()
    db = next(gen)
    calls: list[str] = []
    db.close = lambda: calls.append("closed")
    return gen, db, calls


def test_get_db_yields_a_session_and_closes_it_after_the_request():
    # Arrange
    gen, db, calls = _open_session_with_close_spy()

    # Act
    gen.close()

    # Assert
    assert isinstance(db, Session)
    assert calls == ["closed"]


def test_get_db_closes_the_session_even_when_the_route_raises():
    # Arrange
    gen, _, calls = _open_session_with_close_spy()

    # Act / Assert
    with pytest.raises(RuntimeError):
        gen.throw(RuntimeError("route failed"))
    assert calls == ["closed"]
