#  Introduction to SQL (from sqlbot)


### SQL Lesson 1: SELECT queries 101

- 1. Find the title of each film
    ```
    SELECT title FROM movies;
    ```

- 2. Find the director of each film 
    ```
    SELECT director FROM movies;
    ```

- 3. Find the title and director of each film 
    ```
    SELECT title,director FROM movies;
    ```

- 4. Find the title and year of each film
    ```
    SELECT title,year FROM movies;
    ```

- 5. Find all the information about each film
    ```
    SELECT * FROM movies;
    ```


### SQL Lesson 2: Queries with constraints (Pt. 1) 

- 1.Find the movie with a row id of 6
    ```
    SELECT * FROM movies where id= 6;
    ```
- 2.Find the movies released in the years between 2000 and 2010
    ```
    SELECT * FROM movies where year between 2000 and 2010;
    ```
- 3.Find the movies not released in the years between 2000 and 2010
    ```
    SELECT * FROM movies where year not between 2000 and 2010;
    ```
- 4.Find the first 5 Pixar movies and their release year
    ```
    SELECT * FROM movies limit 5;
    ```

### SQL Lesson 3: Queries with constraints (Pt. 2)

- 1.Find all the Toy Story movies
    ```
    SELECT * FROM movies where title like 'toy%';
    ```
- 2.Find all the movies directed by John Lasseter
    ```
    SELECT * FROM movies where director="John Lasseter";
    ```
- 3.Find all the movies (and director) not directed by John Lasseter
    ```
    SELECT * FROM movies where not director="John Lasseter";
    ```
- 4.Find all the WALL-* movies
    ```
    SELECT * FROM movies where title like 'WALL-%';
    ```

### SQL Lesson 4: Filtering and sorting Query results

- 1.List all directors of Pixar movies (alphabetically), without duplicates
    ```
    SELECT DISTINCT director FROM movies order by director ASC;
    ```
- 2.List the last four Pixar movies released (ordered from most recent to least)
    ```
    SELECT * FROM movies order by year DESC limit 4;
    ```
- 3.List the first five Pixar movies sorted alphabetically
    ```
    SELECT * FROM movies order by title ASC limit 5;
    ```
- 4.List the next five Pixar movies sorted alphabetically
    ```
    SELECT * FROM movies order by title ASC limit 5 OFFSET 5;
    ```

### SQL Review: Simple SELECT Queries

- 1.List all the Canadian cities and their populations
    ```
    SELECT city,Population FROM north_american_cities where country="Canada";
    ```
- 2.Order all the cities in the United States by their latitude from north to south
    ```
    SELECT * FROM north_american_cities where country="United States" order by latitude DESC;
    ```
- 3.List all the cities west of Chicago, ordered from west to east
    ```
    SELECT * FROM north_american_cities where longitude < -87.629798 order by Longitude;
    ```
- 4.List the two largest cities in Mexico (by population)
    ```
    SELECT * FROM north_american_cities where country="Mexico" order by population DESC limit 2 ;
    ```
- 5.List the third and fourth largest cities (by population) in the United States and their population
    ```
    SELECT * FROM north_american_cities where country="United States" order by population DESC limit 2 offset 2 ;
    ```

### SQL Lesson 6: Multi-table queries with JOINs


- 1.Find the domestic and international sales for each movie
    ```
    SELECT m.title, b.domestic_sales, b.international_sales FROM movies as m inner join boxoffice as b on m.id = b.movie_Id;
    ```
- 2.Show the sales numbers for each movie that did better internationally rather than domestically
    ```
    SELECT m.title, b.domestic_sales, b.international_sales FROM movies as m inner join boxoffice as b on m.id = b.movie_Id where b.international_sales > b.domestic_sales;
    ```
- 3.List all the movies by their ratings in descending order
    ```
    SELECT m.title, b.domestic_sales, b.international_sales FROM movies as m inner join boxoffice as b on m.id = b.movie_Id order by b.rating desc;
    ```

### SQL Lesson 7: OUTER JOINs  

- 1.Find the list of all buildings that have employees
    ```
    SELECT distinct building FROM employees;
    ```
- 2.Find the list of all buildings and their capacity
    ```
    SELECT * FROM buildings;
    ```
- 3.List all buildings and the distinct employee roles in each building (including empty buildings)
    ```
    SELECT distinct b.building_name as name, e.role as role FROM buildings as b left join employees as e on b.building_name = e.building;
    ```

### SQL Lesson 8: A short note on NULLs

- 1.Find the name and role of all employees who have not been assigned to a building
    ```
    SELECT name, role FROM employees where building is null;
    ```
- 2.Find the names of the buildings that hold no employees
    ```
    SELECT distinct b.building_name as build FROM buildings as b left join employees as e on b.building_name = e.building WHERE e.building is null;
    ```

### SQL Lesson 9: Queries with expressions

- 1.List all movies and their combined sales in millions of dollars
    ```
    SELECT distinct m.title, (b.domestic_sales + b.international_sales) / 1000000 as sales FROM movies as m  inner join boxoffice as b on m.id= b.movie_id;
    ```
- 2.List all movies and their ratings in percent
    ```
    SELECT distinct m.title, (b.rating * 10) as rating FROM movies as m  inner join boxoffice as b on m.id= b.movie_id;
    ```
- 3.List all movies that were released on even number years
    ```
    SELECT * FROM movies where year % 2 = 0;
    ```

### SQL Lesson 10: Queries with aggregates (Pt. 1)

- 1.Find the longest time that an employee has been at the studio
    ```
    SELECT * FROM employees order by years_employed desc limit 1;
    or
    SELECT Max(Years_employed) FROM Employees;
    ```
- 2.For each role, find the average number of years employed by employees in that role
    ```
    SELECT role, avg(years_employed) FROM employees group by role;
    ```
- 3.Find the total number of employee years worked in each building
    ```
    SELECT building, sum(years_employed) FROM employees group by building;
    ```

### SQL Lesson 11: Queries with aggregates (Pt. 2)    

- 1.Find the number of Artists in the studio (without a HAVING clause)
    ```
    SELECT count(*) FROM employees where role ="Artist";
    ```
- 2.Find the number of Employees of each role in the studio
    ```
    SELECT role,count(*) FROM employees group by role;
    ```
- 3.Find the total number of years employed by all Engineers
    ```
    SELECT role,sum(years_employed) FROM employees group by role having role = "Engineer";
    ```

### SQL Lesson 12: Order of execution of a Query

- 1.Find the number of movies each director has directed
    ```
    SELECT *, count(title) FROM movies group by director;
    ```
- 2.Find the total domestic and international sales that can be attributed to each director
    ```
    SELECT director, sum(b.domestic_sales + b.international_sales) as sales FROM movies as m inner join boxoffice as b on m.id= b.movie_id group by m.director;
    ```

### SQL Lesson 13: Inserting rows


- 1.Add the studio's new production, Toy Story 4 to the list of movies (you can use any director)
    ```
    insert into movies values(14, "Toy Story 4", "Andrew Staton", 2017, 120);
    ```
- 2.Toy Story 4 has been released to critical acclaim! It had a rating of 8.7, and made 340 million domestically and 270 million internationally. Add the record to the BoxOffice table.
    ```
    insert into boxoffice values(14, 8.7, 340000000,270000000);
    ```

### SQL Lesson 14: Updating rows

- 1.The director for A Bug's Life is incorrect, it was actually directed by John Lasseter
    ```
    update movies set director = "John Lasseter" where title="A Bug's Life";
    ```
- 2.The year that Toy Story 2 was released is incorrect, it was actually released in 1999
    ```
    update movies set year=1999 where title="Toy Story 2";
    ```
- 3.Both the title and director for Toy Story 8 is incorrect! The title should be "Toy Story 3" and it was directed by Lee Unkrich
    ```
    update movies set director="Lee Unkrich", title="Toy Story 3" where id=11;
    ```

### SQL Lesson 15: Deleting rows

- 1.This database is getting too big, lets remove all movies that were released before 2005.
    ```
    delete from movies where year < 2005;
    ```
- 2.Andrew Stanton has also left the studio, so please remove all movies directed by him.
    ```
    delete from movies where director="Andrew Stanton";
    ```

### SQL Lesson 16: Creating tables

- 1.Create a new table named Database with the following columns:

    – Name A string (text) describing the name of the database

    – Version A number (floating point) of the latest version of this database
    
    – Download_count An integer count of the number of times this database was downloaded
    This table has no constraints.
    ```
    create table Database (
    Name text,
    Version float,
    Download_count integer
    );
    ```

### SQL Lesson 17: Altering tables

- 1.Add a column named Aspect_ratio with a FLOAT data type to store the aspect-ratio each movie was released in.
    ```
    alter table movies add column Aspect_ratio float;
    ```
- 2.Add another column named Language with a TEXT data type to store the language that the movie was released in. Ensure that the default for this language is English.
    ```
    alter table movies add column Language text default "english";
    ```

### SQL Lesson 18: Dropping tables

- 1.We've sadly reached the end of our lessons, lets clean up by removing the Movies table
    ```
    dorp table if exists movies;
    ```
- 2.And drop the BoxOffice table as well
    ```
    drop table if exists boxoffice;
    ```