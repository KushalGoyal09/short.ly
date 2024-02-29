class UserSession {
    constructor(userId, sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
    }
}

const actieUserSessions = [];

const setUserSession = (userId, sessionId) => {
    const userSession = new UserSession(userId, sessionId);
    actieUserSessions.push(userSession);
}

const getUserSession = (sessionId) => {
    const session = actieUserSessions.find(userSession => userSession.sessionId === sessionId);
    if(session) {
        return session.userId;
    }
    return null;
}

module.exports = {
    setUserSession,
    getUserSession
}