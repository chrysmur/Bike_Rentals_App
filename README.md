## Moving Machine Learning to the Web

### A Simple Linear Regression model for predicting the Popular Bike Rentals

The back end runs Flask.
The project is modeled using Python in the notebook. We simplify the model the web application by including 4 features

- Season
- Temperature
- Day
- Hour

Improvements can be done by increasing the number of features and creating polynormials as shown in the notebook.  
The web application is easy to add these improvements

# Usage

```
git clone git@github.com:chrysmur/Bike_Rentals_App.git
cd Bike_Rentals
```

### Create a virtual environment with python3 interpreter

`virtualenv -p /usr/bin/python3 venv`

### Activate the virtual environment

`source venv/bin/activate`

### Start the web server

`python3 server.py`

### Front-End

```
 cd bikerentals
 npm install
 npm start
```

### Technology Used

- Flask
- Jupyter Notebook
- React
