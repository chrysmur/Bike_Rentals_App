'''
 A Flask application that receives request from the front end and does something
'''
from flask import Flask, Response, abort
import json
JSON_MIME_TYPE = 'application/json'
from flask_cors import CORS
from flask_api import FlaskAPI,status, exceptions
from flask import request,url_for,jsonify

app =FlaskAPI(__name__)
cors = CORS(app)

#Model coefficients and intercept
COEFF_SEASON_3 = -42.697
COEFF_HOLIDAY  = -29.097
COEFF_SEASON_2 = 3.809
COEFF_SEASON_1 = 3.524
COEFF_HOUR     = 8.627
COEFF_SEASON_4 = 42.983
COEFF_TEMP     = 425.523
INTERCEPT      = -119.062

##Default Values
# seasons is categorical so we decide on one
# the mean of the temp
#Spring=1,summer=2,fall=3,winter=4
defData = {'SEASON_1':0,'SEASON_2':0,'SEASON_3':1 ,'SEASON_4':0,'TEMP':0.497,'HOLIDAY':0,'HOUR':11} 
data = defData.copy() ## we can modify this and maintain sanity of the default data
# if you only modify one element of the data, it maintains the rest of the defaults so it does not throw and error
#temperatire normalization
#(t-t_min)/(t_max-t_min), t_min=-8, t_max=+39
def predict(data):
    '''
    y=ax+b
    y=a1x1+a2x2+a3x3+...+anxn for {n in len(data)}
    '''
    y = (COEFF_SEASON_1*data['SEASON_1']) + \
        (COEFF_SEASON_2*data['SEASON_2'])+ \
            (COEFF_SEASON_2*data['SEASON_2'])+ \
                (COEFF_SEASON_3*data['SEASON_3']) +\
                    (COEFF_SEASON_4*data['SEASON_4']) + \
                        (COEFF_HOLIDAY*data['HOLIDAY']) + \
                            (COEFF_HOUR* data['HOUR']) + \
                                (COEFF_TEMP*data['TEMP'])
    #create some json with the results
    pred={'res':round(y,0)}
    return pred

@app.route('/', methods=['POST','GET'])
def requestHandler():
    if request.method=='POST':
        print("request",request.json)
        newData = request.json['data']
        res =predict(newData)
        return res
        
    else:
        res =predict(defData)
        return res

    
if __name__=="__main__":
    app.run(debug=True)