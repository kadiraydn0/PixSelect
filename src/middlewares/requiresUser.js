const requiresUser = async (req, res, next) => {
    
    const user = req.user
    if (!user) {
        return res.sendStatus(403);
    }

    return next();
};

export default requiresUser;
