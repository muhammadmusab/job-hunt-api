import { Auth } from '../../models/Auth';
import { User } from '../../models/User';
import { Company } from '../../models/Company';
import { Token } from '../../models/Token';
import { Job } from '../../models/Job';
import { UserJobs } from '../../models/UserJobs';
Company.hasMany(Auth);
Auth.belongsTo(Company);

Company.hasMany(Job);
Job.belongsTo(Company);

Auth.hasMany(Token);
Token.belongsTo(Auth);

User.hasMany(Auth);
Auth.belongsTo(User);

//Pivot table to USER_JOBS model
User.belongsToMany(Job, { through: UserJobs });
Job.belongsToMany(User, { through: UserJobs });
