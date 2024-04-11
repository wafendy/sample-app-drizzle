import { logger } from "../utils/logger";
import { db, queryClient } from "./index";
import * as schema from "./schema";

async function seedDB() {
  logger.info('Seed started');

  logger.debug('Seeding users ...');

  await db.insert(schema.users).values([
    { emailAddress: 'hdb_user_001@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_002@hdb.gov.sg', emailDomain: 'hdb.gov.sg' }, // Duplicate unique key!
    { emailAddress: 'hdb_user_003@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_004@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_005@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_006@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_007@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_008@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'hdb_user_009@hdb.gov.sg', emailDomain: 'hdb.gov.sg' },
    { emailAddress: 'msf_user_010@msf.gov.sg', emailDomain: 'msf.gov.sg' },
    { emailAddress: 'msf_user_011@msf.gov.sg', emailDomain: 'msf.gov.sg' },
    { emailAddress: 'msf_user_012@msf.gov.sg', emailDomain: 'msf.gov.sg' },
    { emailAddress: 'msf_user_013@msf.gov.sg', emailDomain: 'msf.gov.sg' },
    { emailAddress: 'msf_user_014@msf.gov.sg', emailDomain: 'msf.gov.sg' },
    { emailAddress: 'ica_user_015@ica.gov.sg', emailDomain: 'ica.gov.sg' },
    { emailAddress: 'ica_user_016@ica.gov.sg', emailDomain: 'ica.gov.sg' },
    { emailAddress: 'ica_user_017@ica.gov.sg', emailDomain: 'ica.gov.sg' },
    { emailAddress: 'ica_user_018@ica.gov.sg', emailDomain: 'ica.gov.sg' },
    { emailAddress: 'ica_user_019@ica.gov.sg', emailDomain: 'ica.gov.sg' },
  ])  

  await db.insert(schema.teams).values([
    { name: 'Team Snake', createdById: 1 },
    { name: 'Team Tiger', createdById: 2 },
    { name: 'Team Rabbit', createdById: 3 },
  ])

  await db.insert(schema.teamsToUsers).values([
    { teamId: 1, userId: 1, isAdmin: true },
    { teamId: 2, userId: 2, isAdmin: true },
    { teamId: 3, userId: 3, isAdmin: true },
    { teamId: 1, userId: 4, isAdmin: false },
    { teamId: 2, userId: 5, isAdmin: false },
    { teamId: 3, userId: 6, isAdmin: false },
    { teamId: 1, userId: 7, isAdmin: false },
    { teamId: 2, userId: 8, isAdmin: false },
    { teamId: 3, userId: 9, isAdmin: true },
  ])

  logger.info('Seed completed');

  await queryClient.end();
}

seedDB();
