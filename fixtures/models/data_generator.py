import csv
import random
import argparse
import datetime 
import uuid
import numpy as np
from random import randrange


TOTAL_LINES = 15000
NUMBER_OF_USERS = 2500

LOCATION_TYPES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
LOCATION_INDOOR_OR_OUTDOOR = [0, 1] # 0 = Indoor, 1 = Outdoor
NUMBER_OF_PEOPLE = [0, 1, 2, 3] # 0, 1-5, 5-10, 11+
TIME_SPENT_ON_LOCATION = [0, 1, 2, 3, 4, 5, 6, 7, 8] # 5, 10, 15, 20, 30, 45, 1h, 2h, 2h+
PEOPLE_IN_THE_PARTY = [0, 1, 2, 3] # Just me, 2, 2-4, 4+
QUALITY_OF_AIRFLOW = [0, 1, 2, 3] # Well ventilated , Air conditioning or heating was present and very likely to be working, The air was circulating a lot, Confined space with no apparent ventilation
TEMPERATURE_IN_THE_VENUE = [0 ,1 ,2] # Identical to outside, Dryer than outside, More humid than outside
HUMIDITY_IN_THE_VENUE = [0 ,1 ,2] # Identical to outside, Dryer than outside, More humid than outside
CLEAN_AFTER_EVERY_USAGE = [0, 1, 2, 3] # Yes, No, Often but not after every usage, doesn't apply

fieldnames = [
              "TIMESTAMP", # timestamp of the recorded scan
              "UserID", # unique random Id associated with a user 
              "Location_Type", # NHS define location types https://www.gov.uk/create-coronavirus-qr-poster
              "Location_Inside_or_Outside", # Some locations could still have outdoor companents (types 7, 13, 15, 17, 19)
              "Number_of_People_Present", # Estimated number of people in the location
              "Time_Spent_on_Location", # Time spent at the location
              "Wearing_Masks", # If people were wearing masks
              "Staff_Properly_Wearing_PPE", # Staff properly wearing their PPE
              "People_Properly_Wearing_PPE", # People properly wearing their PPE
              "Social_Distancing", # Was the social distancing rules followed
              "Additional_Measures_in_Place", # Additional protective measures implemented at the place (one way system, etc.)
              "Number_of_People_in_the_Party", # Number of people in the party
              "All_Members_of_Household", # Members were part of the household yes/no
              "All_Members_of_Support_Bubble", # Some members were not part of the household but the bubble yes/no
              "Quality_of_the_Airflow", # Estimation of the quality of the airflow
              "Temperature_in_Venue", # How was the temperature in the venue
              "Humidity_in_Venue", # How was the humidity in the venue
              "Clean_after_Every_Usage", # Was the location cleaned after usage
              "Any_Contact_Between_Members", # Any close contact with members of the party (handshake, etc.)
              "Physical_Activity", # Was the activity a physical or singing one
              "Exposure_Led_to_Contamination", # Outcome of the exposure
              "Risk_of_Contamination" # Risk of exposure
              ]

def get_arguments():
    parser = argparse.ArgumentParser(description='Generate the synthetic data for MOAI')
    return parser.parse_args()


def generate_users(number_of_users):
    users = []
    for i in range(number_of_users):
        user = str(uuid.uuid4())
        users.append(user)
    return users


def random_date(start,l):
   current = start
   while l >= 0:
      curr = current + datetime.timedelta(minutes=randrange(5))
      current = curr
      yield curr
      l-=1

# We generate timestamps in the dd/mm/yyyy hh:mm format. For example: 01/01/20 00:21.
def generate_timestamps():
    timestamps = []
    startDate = datetime.datetime(2020, 1, 1, 0, 0)
    for d in random_date(startDate, TOTAL_LINES):
        timestamps.append(d.strftime("%d/%m/%y %H:%M"))
    return timestamps

def generate_record(user_id, timestamp, noise):
    record = []

    # We add the timestamp and the user to the record
    record.append(user_id)
    record.append(timestamp)

    # Sampling of the locations
    location = random.choices(LOCATION_TYPES, weights=[5, 3, 5, 3, 5, 5, 5, 5, 7, 5, 5, 1, 5, 3, 5, 13, 11, 6, 3], k=1)
    record.append(location[0])

    # Some locations can be indoor or outdoor so we need to reflect that
    type_indoor_outdoor = [0]
    if(location[0] == 6 or location[0] == 12 or location[0] == 14 or location[0] == 16 or location[0] == 18):
        type_indoor_outdoor = random.choices(LOCATION_INDOOR_OR_OUTDOOR, weights=[80, 20], k=1)
        record.append(type_indoor_outdoor[0])
    else:
        record.append(0)
    
    # Number of people present on location
    estimated_number = random.choices(NUMBER_OF_PEOPLE, weights=[5, 15, 40, 40], k=1)
    record.append(estimated_number[0])

    # How long the stay at the location was
    stay_duration = random.choices(TIME_SPENT_ON_LOCATION, weights=[5, 15, 15, 15, 10, 10, 18, 10, 2], k=1)
    record.append(stay_duration[0])

    # The people and staff was wearing masks
    everyone_using_ppe = 0
    if(location[0] == 14):
        record.append(1)
        record.append(0) # Assumed yes because they risk a fine
        record.append(1) # no one wears it in restaurants etc
    else:   
        everyone_using_ppe = random.choices([0,1], weights=[95, 5], k=1)
        record.append(everyone_using_ppe[0])
        # If no was the staff wearing correctly
        staff_using_correctly = random.choices([0,1], weights=[95, 5], k=1)
        record.append(staff_using_correctly[0])
        # If yes were people using it correctly
        people_using_correctly = random.choices([0,1], weights=[80, 20], k=1)
        record.append(people_using_correctly[0])
 
    # Were people following the social distancing rules7
    social_distancing_respected = random.choices([0,1], weights=[70, 30], k=1)
    record.append(social_distancing_respected[0])

    # Were additional protection were put in place
    additional_measures = random.choices([0,1], weights=[70, 30], k=1)
    record.append(additional_measures[0])

    # How many were in your party 
    number_in_party = random.choices(PEOPLE_IN_THE_PARTY, weights=[10, 40, 40, 10], k=1)
    record.append(number_in_party[0])

    # Were all the member of your party from your household
    household_only = random.choices([0,1], weights=[30, 70], k=1)
    record.append(household_only[0])

    # Were all the members from your support bubble
    support_bubble_only = random.choices([0,1], weights=[95, 5], k=1)
    record.append(support_bubble_only[0])

    # How was the air flow
    airflow = random.choices(QUALITY_OF_AIRFLOW, weights=[20, 30, 30, 20], k=1)
    record.append(airflow[0])

    # How was the temperature in the venue
    temperature = random.choices(TEMPERATURE_IN_THE_VENUE, weights=[10, 60, 30], k=1)
    record.append(temperature[0])

    # How was the humidity in the venue
    humidity = random.choices(HUMIDITY_IN_THE_VENUE, weights=[60, 35, 5], k=1)
    record.append(humidity[0])

    # Were the surfaces cleaned after every usage
    clean_after_usage = [3]
    if(location[0] == 0 or location[0] == 3 or location[0] == 4 or location[0] == 7 or location[0] == 9 or location[0] == 14 \
        or location[0] == 16 or location[0] == 17):
        clean_after_usage = random.choices(CLEAN_AFTER_EVERY_USAGE, weights=[20, 20, 60, 0], k=1)
        record.append(clean_after_usage[0])
    else:
        record.append(clean_after_usage[0])
    
    # Did any contact between members of the party occur during the gathering
    close_contact = [2]
    if(type_indoor_outdoor[0] == 1):
        close_contact = random.choices([0,1], weights=[80, 20], k=1)
        record.append(close_contact[0])
    else:
        # Doesn't apply
        record.append(close_contact[0])

    # Did it involve singing or physical activities
    activity_involves_large_expectorations = [2]
    if(type_indoor_outdoor[0] == 1):
        activity_involves_large_expectorations = random.choices([0,1], weights=[95, 5], k=1)
        record.append(activity_involves_large_expectorations[0])
    else:
        # Doesn't apply
        record.append(activity_involves_large_expectorations[0])

    # Do we have a confirmed case of exposure - 0 = exposure but no contamination, 1 = exposure led to contamination, 2 = unknown if exposure or not and outcome
    confirmed_case = random.choices([0,1,2], weights=[11, 2, 87], k=1)
    record.append(confirmed_case[0])


    # We add the likeliky exposure risk for the given setup -- this is an approximation based on the litterature
    y=10
    if(location[0] == 0 or location[0] == 1 or location[0] == 5 or location[0] == 10 or location[0] == 13 or location[0] == 14):
        y += 35
    else:
        if(location[0] == 6 or location[0] == 12 or location[0] == 14 or location[0] == 16 or location[0] == 18):
            y += 5
    
    if (stay_duration[0] <= 6):
        y += 10
    else:
        y += 35
    
    if(airflow[0] == 2 or airflow[0] == 3):
        y += 30
    
    if(close_contact[0] == 1):
        y += 35

    if(activity_involves_large_expectorations[0] == 1):
        y += 35

    y += noise

    if(y > 100):
        y = 99

    # The likelihood of exposure becomes 1
    if(confirmed_case[0] == 1):
        y = 100

    exposure_outcome = random.choices([0,1], weights=[100-y, y], k=1)

    record.append(exposure_outcome[0])

    return exposure_outcome[0], record


def main():
    args = get_arguments()
    tot_exposure = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    tot_not_exposed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    with open("moai_data_" + str(TOTAL_LINES) +".csv", 'a', newline='\n') as csvfile:
        clientwriter = csv.writer(csvfile, delimiter=',')
        clientwriter.writerow(fieldnames)

        # We add a laplacian Noise
        noise = np.random.laplace(0, .5, size=TOTAL_LINES)

        # We generate a set of random anonymous users and timestamps for the records
        users = generate_users(NUMBER_OF_USERS)
        timestamps = generate_timestamps()
        
        for i in range(TOTAL_LINES):
            exposure_outcome, record = generate_record(timestamps[i], random.choice(users) ,noise[i])
            if(exposure_outcome == 1):
                tot_exposure[record[2]] += 1
            else:
                tot_not_exposed[record[2]] += 1
            clientwriter.writerow(record)       
    
    print(tot_exposure)
    print(sum(tot_exposure))
    print(tot_not_exposed)
    print(sum(tot_not_exposed))
    
    return


if __name__ == '__main__':
    main()