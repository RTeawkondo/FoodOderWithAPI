import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [meals,setMeals] = useState([])
  const [isLoading,setLoading] = useState(false)
  const [httpError,setError] = useState("")
  useEffect(()=>{
    const fetchMeals = async () =>{
      setLoading(true)
      const res = await fetch("https://foododer-bf764-default-rtdb.firebaseio.com/meals.json")
      const resData = await res.json() 
      const loadedMeals = []
      if(!res.ok){
        throw new Error("Something went wrong!")
      }
      for (const key in resData){
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price
        })
      }
      setMeals(loadedMeals)
      setLoading(false)
    }

    fetchMeals().catch(err=>{
      setLoading(false)
      setError(err.message)
    })

  },[])

  //console.log(meals);
  if(isLoading){
    return <section className={classes.mealsLoading}>
      <p>Loading....</p>
    </section>
  }

  if(httpError){
    return <section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
