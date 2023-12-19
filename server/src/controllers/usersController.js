const { getUserService } = require("../service/userSerivce");

module.exports = {
  async getUserController(req, res) {
    try {
      const userId = req.params.id;
      const user = await getUserService(userId);

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
