{
    "title":"Javascript Developer",
    "descriptionShort":"We require Javascript developer",
    "requirements":["should know Javascript"],
    "tags":["Javascript"],
    "category":"Software",
    "expiryDate":"3/14/2023",
    "salary":1000.00,
    "experience":"ENTRY",
    "employementType":"FULL_TIME",
    "projectLength":"5 years",
    "location":"Germany"
}
{
    "title":"Javascript Developer",
    "descriptionShort":"We require Javascript developer",
    "requirements":["should know Javascript"],
    "tags":["Javascript"],
    "category":"Software",
    "expiryDate":"3/15/2023",
    "salary":1200.00,
    "experience":"ENTRY",
    "employementType":"INTERNSHIP",
    "projectLength":"3 years",
    "location":"Germany"
}
{
    "title":"React Developer",
    "descriptionShort":"We require React developer",
    "requirements":["should know React"],
    "tags":["React"],
    "category":"Software",
    "expiryDate":"3/18/2023",
    "salary":1400.00,
    "experience":"INTERMEDIATE",
    "employementType":"FULL_TIME",
    "projectLength":"3 years",
    "location":"Australia"
}
{
    "title":"Vue Developer",
    "descriptionShort":"We require Vue developer",
    "requirements":["should know Vue"],
    "tags":["Vue"],
    "category":"Software",
    "expiryDate":"3/19/2023",
    "salary":1800.00,
    "experience":"INTERMEDIATE",
    "employementType":"CONTRACT",
    "projectLength":"2 years",
    "location":"Australia"
}
{
    "title":"React Developer",
    "descriptionShort":"We require React developer",
    "requirements":["should know React"],
    "tags":["React"],
    "category":"Software",
    "expiryDate":"3/20/2023",
    "salary":2000.00,
    "experience":"EXPERT",
    "employementType":"HOURLY",
    "projectLength":"5 years",
    "location":"United States"
}
{
    "title":"React Developer",
    "descriptionShort":"We require React developer",
    "requirements":["should know React"],
    "tags":["React"],
    "category":"Software",
    "expiryDate":"3/20/2023",
    "salary":2000.00,
    "experience":"EXPERT",
    "employementType":"CONTRACT",
    "projectLength":"5 years",
    "location":"United States"
}
{
    "title":"Python Developer",
    "descriptionShort":"We require Python developer",
    "requirements":["should know Python"],
    "tags":["Python"],
    "category":"Software",
    "expiryDate":"3/21/2023",
    "salary":2100.00,
    "experience":"EXPERT",
    "employementType":"PART_TIME",
    "projectLength":"3 years",
    "location":"Indonesia"
}
{
    "title":"Django Developer",
    "descriptionShort":"We require Django developer",
    "requirements":["should know Django"],
    "tags":["Django"],
    "category":"Software",
    "expiryDate":"3/22/2023",
    "salary":2200.00,
    "experience":"INTERMEDIATE",
    "employementType":"PART_TIME",
    "projectLength":"4 years",
    "location":"Indonesia"
}
{
    "title":"Angular Developer",
    "descriptionShort":"We require Angular developer",
    "requirements":["should know Angular"],
    "tags":["Angular"],
    "category":"Software",
    "expiryDate":"3/22/2023",
    "salary":2200.00,
    "experience":"INTERMEDIATE",
    "employementType":"HOURLY",
    "projectLength":"2 years",
    "location":"Indonesia"
}













// import type { Migration } from '../umguz';
// import { DataTypes, Sequelize } from 'sequelize';

// export const up: Migration = async ({ context }: { context: Sequelize }) => {
  /*
 The SQL command UPDATE "Jobs" SET new_tags = ARRAY[tag] updates the newly added new_tags column in the Jobs table, by setting its value equal to the value of the tags column.

The ARRAY function is used to convert the value of tag to an array, as the new_tags column has an array data type. The UPDATE statement is used to modify the value of the new_tags column for each row in the Jobs table.

So this command sets the value of the new_tags column for each row in the Jobs table equal to an array containing the value of the tags column.
  */

// context.getQueryInterface()
// .addColumn('Jobs', 'temp_tags', { type: DataTypes.ARRAY(DataTypes.JSONB) })
// .then(() => {
//   return context.query('UPDATE "Jobs" SET temp_tags = CASE WHEN tags IS NULL THEN ARRAY[]::json[] ELSE ARRAY[tags] END')
// })
// .then(() => {
//   return context.getQueryInterface().removeColumn('Jobs', 'tags')
// })
// .then(() => {
//   return context.getQueryInterface().renameColumn('Jobs', 'temp_tags', 'tags')
// });
// }
// export const down: Migration = async ({ context }: { context: Sequelize }) => {

//   await context.getQueryInterface().removeColumn('Jobs', 'new_tags');
//   await context.getQueryInterface().removeColumn('Jobs', 'temp_tags');
// };












