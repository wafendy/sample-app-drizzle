import { eq } from "drizzle-orm";
import { db, queryClient } from "./db";
import { teams, teamsToUsers, users } from "./db/schema";
import { logger } from "./utils/logger"

async function main() {  
  let message: string = 'Hello, World!';

  var rows = await db.select({
                  userEmail: users.emailAddress,
                  teamName: teams.name,
                  isAdmin: teamsToUsers.isAdmin,
                })
                .from(teamsToUsers)
                .leftJoin(users, eq(teamsToUsers.userId, users.id))
                .leftJoin(teams, eq(teamsToUsers.teamId, teams.id))
                .where(eq(teams.id, 3));
  
  logger.debug(rows);

  for(const row of rows) {
    logger.debug(`${row.userEmail} - ${row.teamName} : ${row.isAdmin}`);
  }

  logger.info(message);
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async() => {
    await queryClient.end();
  })

  // 0: {
  //   "userEmail": "hdb_user_003@hdb.gov.sg",
  //   "teamName": "Team Rabbit",
  //   "isAdmin": true
  // }
  // 1: {
  //   "userEmail": "hdb_user_006@hdb.gov.sg",
  //   "teamName": "Team Rabbit",
  //   "isAdmin": false
  // }
  // 2: {
  //   "userEmail": "hdb_user_009@hdb.gov.sg",
  //   "teamName": "Team Rabbit",
  //   "isAdmin": true
  // }


// select
//   "users"."email_address",
//   "teams"."name",
//   "teams_to_users"."is_admin" 
// from
//   "teams_to_users" 
// left join
//   "users" 
//       on "teams_to_users"."user_id" = "users"."id" 
// left join
//   "teams" 
//       on "teams_to_users"."team_id" = "teams"."id" 
// where
//   "teams"."id" = $1

