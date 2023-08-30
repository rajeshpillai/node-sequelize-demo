const { Sequelize, DataTypes, Model } = require('sequelize');

// Initialize Sequelize to connect to your database
const sequelize =require("./connection");
const {Purpose, Policy} = require("./models");


// Define the Relation model (join table)
const Relation = sequelize.define('Relation', {
  policyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Policy,
      key: 'id'
    },
    primaryKey: true
  },
  purposeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Purpose,
      key: 'id'
    },
    primaryKey: true
  }
}, {
  tableName: 'relation'
});

// Define the many-to-many relationships
Purpose.belongsToMany(Policy, { through: Relation, foreignKey: 'purposeId' });
Policy.belongsToMany(Purpose, { through: Relation, foreignKey: 'policyId' });

// Function to run the example
const runExample = async () => {
  try {
    // Sync database schema
    await sequelize.sync({ force: true });

    // Create instances
    const purpose1 = await Purpose.create({ desc: 'Purpose 1' });
    const purpose2 = await Purpose.create({ desc: 'Purpose 2' });

    const policy1 = await Policy.create({});
    const policy2 = await Policy.create({});

    // Set relations
    await purpose1.addPolicy(policy1);
    await purpose1.addPolicy(policy2);

    await purpose2.addPolicy(policy2);

    // Fetch and log results
    const purposesWithPolicies = await Purpose.findAll({
      include: Policy
    });

    console.log('Purposes and their Policies');
    purposesWithPolicies.forEach(purpose => {
      const policies = purpose.Policies.map(policy => policy.id).join(', ');
      console.log(`Purpose id ${purpose.id} with desc: ${purpose.desc} has Policies: ${policies}`);
    });

  } catch (error) {
    console.error('Error running example:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Run the example
runExample();
