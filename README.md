# YokoBot
## (Work in Progress Name & Set-Up)

*Side note, I know you said nothing too crazy but uh.. I'm neurotic and if I was doing it I wanted to really do it ya know?*

### Source-code hosting: Github in a private repository so auto git-pull updates should be possible to keep LTS available. 

# Commands:
## - Slash Commands
### - Tournaments
Create a tournament with parameters: 
```
Mode: Solo / Duos / Trios
Hero Points: Enabled / Disabled (Default: Disabled)
Platform: Crossplay, Console, PC (Default: Crossplay)
Tournament Scheduled Time
Required Check-In: Enabled / Disabled (Default: Enabled)
Check-In Offset: 1 to 3 Hours (Default: 1 Hour)
Rounds: (Default: 3)
Substutions: (Default: 1)
Notifications: Direct Message, Channel Message (Default: DM)
Event Time-Zone: EST / CST / PST (Default: EST)
Host Name: Discord UID
Stream Location: https://
```
Once the tournament is created, a message is posted in the channel the command is ran in and adds buttons for the users to interact with. These buttons would be:
- Create Team
- Join Team
- Unregister
- Time Left
- Team Information

The buttons would create the appropriate UI for what they're looking for, or simply a "User Only Viewed Message" in the channel that only they can see.

### - Results
This would simply allow the tournament organizers to post the results to the specific tournament they're closing out. It'd pull up a menu with a drop-down styled UI that allows you to select the position of each team, which place they finished, as well as their overall score. It would then post these results to a channel.

## Back-End and Further Development
### Website
Ultimately, I'd like to take this project and convert it to a much larger one that involves a database as that would be the easiest way to store this data. Essential, the goal is, after you type /results, it'd back up the data, post it to the database, and then auto-update with a website UI that I plan on implementing. That way all the data can be store on a publicly accessed website, see previous tournament winners, and also help you long-term develop seeding brackets etc.

Not to mention, it keeps you in contact with people who on average register for tournaments and allows us to collect discord IDs and in-game IDs to advertise future tourneys.


- ***Coding Overview:***
```
- root
  - bot
    - bot.js
    - commands
      - tournament.js
      - results.js
    - components
      - createTeam.js
      - joinTeam.js
      - unregister.js
      - timeLeft.js
      - teams.js
  - database
    - index.js
    - models
      - Tournament.js
      - Team.js
      - User.js
```

Ultimately, using this set-up I could add more modules and more things to this and build it further past just tourneys if there's things in the future we want to create.
