module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "People", // table name
        "deleted", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "People", // table name
        "deletedAT", // new field name
        {
          type: Sequelize.DATE,
          allowNull: true,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all(
      [queryInterface.removeColumn("People", "deleted")],
      [queryInterface.removeColumn("People", "deletedAt")]
    );
  },
};
