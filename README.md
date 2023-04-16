# Librus Discord
A Discord bot for displaying info from Librus Synergia using [librus-api](https://github.com/Mati365/librus-api). Currently it only supports displaying your account data and the most recent announcement. Not really suited for usage right now.

### Current bugs
Example: If user X enters valid login credentials and chooses to display account info, everything works as intended and user X is able to see the data. If right afer that user Y enters invalid login credentials and also chooses to display account info, despite the fact that
axios returns 403 error, user Y sees user X's data

### Security risks
All replies sent by the bot **must** be ephemeral. Otherwise any user is able to click on the message that says "Username used /librus" to display all of the login credentials they have entered.

### Environment variables

```
TOKEN="Bot token"
GUILD_ID="Server id for command registeration"
CLIENT_ID="Bot account id" 
```
