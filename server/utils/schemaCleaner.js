// Function that modifies a Mongoose schema by adding a toJSON transformation
const schemaCleaner = (schema) => {
  // Set the 'toJSON' option of the schema
  schema.set('toJSON', {
    transform: (_document, returnedObject) => {
      // Rename the '_id' field to 'id'
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id; // Remove the '_id' field
      delete returnedObject.__v; // Remove the '__v' field
      delete returnedObject.passwordHash; // Remove the 'passwordHash' field
    },
  });
};

// Exporting the schemaCleaner function to be used in other parts of the code
module.exports = schemaCleaner;
