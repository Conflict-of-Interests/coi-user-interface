const rules = {
  trainer: {
    static: ["trainer_home:view","batch_dashboard:view"]
  },
  associate: {
    static: ["associate_dashboard:view", "associate_home:view"],
    dynamic: {
      "feedback:give": ({userId, associateId}) => {
        if (!userId || !associateId) return false;
        return userId === associateId;
      }
    }
  }
}

export default rules;
