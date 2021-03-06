from lightgbm.engine import CVBooster
import numpy as np
import lightgbm as lgb
import json


def main():
    # We load the synthetic data generated by the data_generator.py script
    data = np.loadtxt(open("moai_data_150000_noise.csv", "rb"), delimiter=",", skiprows=1, usecols=range(2,22))

    x_columns =  [i for i in range(19)]
    train_data = data[:, x_columns]
    label = data[:, [-1]].reshape(1,data.shape[0])

    num_round = 1000
    # Labels of the columns
    lgb_data = lgb.Dataset(train_data, label=label[0], feature_name=['Location_Type','Location_Inside_or_Outside','Number_of_People_Present','Time_Spent_on_Location','Wearing_Masks','Staff_Properly_Wearing_PPE', 'People_Properly_Wearing_PPE','Social_Distancing','Additional_Measures_in_Place','Number_of_People_in_the_Party','All_Members_of_Household','All_Members_of_Support_Bubble','Quality_of_the_Airflow','Humidity_in_Venue', 'Temperature_in_Venue', 'Clean_after_Every_Usage','Any_Contact_Between_Members','Physical_Activity', 'Exposure_Led_to_Contamination'], 
    # We declare all the categorical features -- in this instance all the columns are categorical features
    categorical_feature=['Location_Type','Location_Inside_or_Outside','Number_of_People_Present','Time_Spent_on_Location','Wearing_Masks','Staff_Properly_Wearing_PPE', 'People_Properly_Wearing_PPE','Social_Distancing','Additional_Measures_in_Place','Number_of_People_in_the_Party','All_Members_of_Household','All_Members_of_Support_Bubble','Quality_of_the_Airflow', 'Humidity_in_Venue', 'Temperature_in_Venue' ,'Clean_after_Every_Usage','Any_Contact_Between_Members','Physical_Activity', 'Exposure_Led_to_Contamination'])

    # Parameters choosen by tuning the model in Pycaret
    params = {
        'boosting_type':'gbdt',
        'class_weight':None, 
        'colsample_bytree':1.0, 
        'importance_type':'split', 
        'learning_rate':0.1, 
        'max_depth':-1,
        'min_child_samples': 20, 
        'min_child_weight': 0.001, 
        'min_split_gain': 0.0,
        'n_estimators':100, 
        'n_jobs':-1, 
        'num_leaves': 31, 
        'objective': 'binary',
        'random_state':1657, 
        'reg_alpha':0.7, 
        'reg_lambda':10,
        'subsample':1.0, 
        'subsample_for_bin':200000, 
        'subsample_freq':0
    }

    # We train the model using the loaded data and the parameters.
    # The parameters were defined using the tune function in Pycaret and optimizing for Accuracy
    gbm = lgb.train(params, lgb_data, num_round)

    # How to save the generated model to a text file for use in the platform
    # gbm.save_model('moai_model.txt')

    # Prints features names
    print('Feature names:', gbm.feature_name())

    # Prints features importance
    print('Feature importances:', list(gbm.feature_importance()))

    # Two examples that outputs the risk exposure for two records using the trained model
    print(gbm.predict([[14,1,2,5,1,0,1,1,1,2,1,0,1,1,0,2,0,0,float("NaN")],
    [2,0,2,3,0,0,0,1,0,1,1,0,2,1,1,3,2,2,0]
    ]))
 
    return


if __name__ == '__main__':
    main()

