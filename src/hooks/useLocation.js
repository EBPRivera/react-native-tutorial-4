import { useState, useEffect } from 'react'
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';
// requestPermissionsAsync: Requests the device for location
//  called in a try-catch statement
//  throws an error if permission denied by the user
// watchPositionAsync: watches the users location
//  timeInterval: get update every time interval (in ms)
//  distance: get update every distance (in metres)
//  second parameter: describes the user's location

export default (shouldTrack, callback) => {
  const [error, setError] = useState('');

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distance: 10
        }, callback
      );
      } catch (err) {
        setError(err);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    }

    return () => { // cleanUp Function
      if (subscriber) {
        subscriber.remove();
      }
    }
  }, [shouldTrack, callback])

  return [error];
}
