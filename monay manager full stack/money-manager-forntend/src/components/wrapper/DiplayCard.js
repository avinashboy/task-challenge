import React from 'react'
import {Card} from "react-bootstrap";
import {incomeCategories, expenseCategories, resetCategories} from "../../constants"
import { Doughnut } from 'react-chartjs-2';
 
function DisplayCard({title,data}) {
    resetCategories()
    const total = data.reduce((acc, curVal) => acc += Number(curVal.cost), 0)
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    data.forEach((t) => {
        const category = categories.find((c) => c.type === t.category);
    
        if (category) category.cost += Number(t.cost);
      });
    
      const filteredCategories = categories.filter((sc) => sc.cost > 0);


      const chartData = {
        datasets: [{
          data: filteredCategories.map((c) => c.cost),
          backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
      };
    return (
        <>
        {
          data.length ? <>
          <Card>
                <Card.Header className="py-3 text-center" ><h3 className="font-weight-bold">{title}</h3> </Card.Header>
                <Card.Body>
                    <Card.Title>{total}</Card.Title>
                    <Doughnut data={chartData} />
                </Card.Body>
                </Card>
          </> : <h3 className="font-weight-bold">No record</h3>
        }
            
        </>
    )
}

export default DisplayCard
