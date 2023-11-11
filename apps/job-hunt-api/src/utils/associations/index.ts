import { Auth } from '../../models/Auth';
import { User } from '../../models/User';
import { Company } from '../../models/Company';
import { Token } from '../../models/Token';
import { Job } from '../../models/Job';
import { UserJobs } from '../../models/UserJobs';
import { Address } from '../../models/Address';
import { UserExperience } from '../../models/UserExperience';
import { UserEducation } from '../../models/UserEducation';
import { UserCertification } from '../../models/UserCertification';
import { UserSkill } from '../../models/UserSkill';
import { CompanyContact } from '../../models/CompanyContact';
import { CompanySocial } from '../../models/CompanySocial';
import { CompanyArea } from '../../models/CompanyArea';

// user and company relation with auth table
Company.hasMany(Auth);
Auth.belongsTo(Company);

User.hasMany(Auth);
Auth.belongsTo(User);

Company.hasMany(Job);
Job.belongsTo(Company);

Auth.hasMany(Token);
Token.belongsTo(Auth);


// user profile related relations
User.hasMany(UserExperience);
UserExperience.belongsTo(User);
User.hasMany(UserEducation);
UserEducation.belongsTo(User);
User.hasMany(UserCertification);
UserCertification.belongsTo(User);
User.hasMany(UserSkill);
UserSkill.belongsTo(User);
User.hasMany(Address);
Address.belongsTo(User);


// company profile related relations
Company.hasMany(CompanyContact);
CompanyContact.belongsTo(Company);
Company.hasMany(CompanySocial);
CompanySocial.belongsTo(Company);
Company.hasMany(Address);
Address.belongsTo(Company);
Company.hasMany(CompanyArea);
CompanyArea.belongsTo(Company);

//Pivot table to USER_JOBS model
User.belongsToMany(Job, { through: UserJobs });
Job.belongsToMany(User, { through: UserJobs });
