# Back-end API endpoint documentation

## Routes

Auth
Users
Entries
Score 
‘/auth/register’
‘/users/all’(admin)
‘/entries/all’
(GET)
‘/scores/latest’ (GET)
‘/auth/login’
‘/users/account/delete ‘
‘entries/new’ (POST)’
‘/scores/new’ (POST)


‘users/memo/update’
‘entries/:id/delete’?
‘/scores/all’ (GET)


‘users/data’ (profile data)
‘entries/tags/today’
‘scores/month’ (GET)


‘users/search/:user’
‘entries/tags/month’



Track  (i.e who is tracking the user)
‘/track/authorise/:user’’
1. Adds :user to logged in user’s ‘tracker’ field
2. Adds logged in user to :users ‘tracking’ field
‘track//trackers/remove’ (reverse of above route)
‘/track/list/trackers’
‘/track/list/tracking’



## Endpoints 

AUTH

‘/auth/register’

- Method: POST
- args: none
- Authentication: bearer{token}
- Authorisation: none
- Description: returns
- request body: 
```
{
	“email”: 
	“usr”:
	“pwd”:
	“age” (YYYY-MM-DD string format)
}
```
- response body:
```
{
    	"Success” : “User added to database”
}
```

<em>‘/auth/login’</em>

- Method: POST
- args: none
- Authentication: none
- Description: returns a token if user has been registered 
- request body: none
```
{
	“usr”:
	“pwd":
}
```
- response body: 
```
{
	“Token”: [JWT (id = usr) is returned to client for storage in browser]
}
```
<u>USER</u>

<em>‘users/search/:user’</em>

- Method: GET
- args: username
- Authentication: token (bearer)
- Description: adds the latest score the logged in user just answered
- request body: none
- response body: 
```
{
“username”:
}
```

<em>‘users/data’</em>

- Method: GET
- args: none
- Authentication: token (bearer)
- Description: returns basic data belonging to the logged in user 
- request body: none
- response body: 
```
{
    “Username”:
	“Age”:
	“Trackers”:[]
	“Tracking”:[]
	“Memo”:
	
}
```

<em>‘users/memo/update’</em>

- Method: PATCH
- args: none
- Authentication: token (bearer)
- Description: update’s logged-users 
- request body:
```
{
“Memo”: (text)
}
```
- response body: 
```
{
Success: “memo updated successfully”	
}
```

<em>‘users/account/delete’</em>

- Method: PATCH
- args: none
- Authentication: token (bearer)
- Description: update’s logged-users 
- request body: none
- response body: 
```
{
Success: “account successfully deleted”	
}
```

SCORE

<em>‘/scores/new’</em>

- Method: POST
- args: none
- Authentication: token (bearer)
- Description: adds the latest score the logged in user just answered
- request body: 
```
{
	“username”:
	“Timestamp”: [datetime.now()],
	“Score”: integer 
```
- response body: 

```
{
“Success”: “score added”
}
```

<em>‘scores/latest’</em>

- Method: GET
- args: none
- Authentication: token (bearer)
- Description: retrieves the latest score the logged in user has answered
- request body: none
- response body: 
```
{
        “Current user score” :{
		“Id":
		“Score”: [int]
}
```

<em>‘scores/all’</em>

- Method: GET
- args: none 
- Authentication: token (bearer)
- Description: retrieves all scores from logged in user 
- request body: none
- response body: 
```
{
	User scores: 
		[{“id”:
		“Timestamp”:
		“Score”:}], …
}
```

<em>‘/scores/month’</em>

- Method: GET
- Args: none 
- Authentication: token (bearer)
- Description: retrieves all scores from logged-in user from the past 30 days 
- request body: none
- response body: 
```
{
	User scores: 
		[{“id”:
		“Timestamp”:
		“Score”:}], …
}
 ```


ENTRIES

<em>‘entries/all’</em>

- Method: GET
- args: none 
- Authentication: token (bearer)
- Description: retrieves all logged-in from past 30 days 
- request body: none
- response body: 
```
{
		[{“id”:
		“title”:
		“Text”:
		“Timestamp”:
		“Tags”: []
		}], …
}
```

<em>‘/entries/new’</em>

- Method: POST
- args: none 
- Authentication: token (bearer)
- Description: logged-in user creates a new entry 
- request body: 
```
{
		[
		“title”:
		“Text”:
		“Timestamp”:
		“Tags”: []
		}], …
}
```
- response body: 
```
{‘success’ : ‘entry added’}
```
 
<em>‘entries/tags/today’</em>

- Method: GET
- args: none 
- Authentication: token (bearer)
- Description: retrieves logged-in users tags they posted the day the route is hit
- response body: 
```
{
		[{	“timestamp:
			“Tags”: []
		}], …
}
```
<em>‘entries/tags/month’</em>

- Method: GET
- args: none 
- Authentication: token (bearer)
- Description: retrieves logged-in users tags they posted in the last 30 days
- request body: none
- response body: 
```
{
		[{	“timestamp:
			“Tags”: []
		}], …
}
```

<u>TRACK</u>

<em>‘track/authorise/:tracker’</em>

- Method: POST
- args: tracker
- Authentication: token (bearer)
- Description: adds a specified user to the logged-in user’s ‘Tracker’ list, simultaneously adding the logged-in user to the specified users ‘tracking’ list.
- request body: none
- response body: 
```
{
		{success: “tracker authorised}”
}
```
<em>‘track/list/trackers’</em>

- Method: GET
- args: none
- Authentication: token (bearer)
- Description: returns an array of the logged-in user’s trackers
- request body: none
- response body: 
```
{
		[{[
			“User”: 
		]}], …
}
```

<em>‘track/list/tracking’</em>

- Method: GET
- args: none
- Authentication: token (bearer)
- Description: returns an array of who the logged-in user is currently tracking
- request body: none
- response body: 

```
{
		[{[

			“User”: 

		]}], …
}
```

<em>‘track/tracker/revoke’</em>

- Method: DELETE
- args: none
- Authentication: token (bearer)
- Description: revokes tracking privileges for a specified user
- request body: none
- response body: 
```
{
		‘Success’: ‘user no longer tracking’
}
```

ADMIN-PROTECTED 



## DB Design and Schemas 


User: 
- _id 
- Username (string, unique)
- Password (bcrypt)
- age (YYYY-MM-DD)
- is_admin (boolean) 
- Trackers: ARRAY   
- Tracking: ARRAY 
- Memo: (string, 150 char)

Entry: 
- _id
- Username (string, unique)
- Timestamp (date)
- Title (string)
- Content: Text(150char)
- tags ARRAY

Score:
- _id
- Username
- Score (integer)
- timestamp (date)




