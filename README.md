# Natural Disasters Around World

<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoJJBsuXLDEAUAk7qqQg-URz8Odn4BADnIA&usqp=CAU" alt="Sublime's custom image"/>
</p>

# Description
The team explored the Natural Disaster occurences from around the world. The dataset used compiled each natural disaster in the EM-DAT (Emergency Events Database). To start using Pandas, we filtered the dataset only for natural disasters, deleted any unnecessary columns and converted dates to a usable format. From there, it was a matter of creating and save data files needed to final visualizations. We took advantage of Jupyter Notebook's interactive interface as well as Pandas and Matplotlib for quick visualizations and to get a sense of what is happening in the world. After the team decided on the final visualizations, team members started compiling HTML pages and the background JavaScript logic for the website. There are six webpages in total. We used a variety of JS libraries, including D3, Plotly, Chart.JS and Leaflet.

Once we got the website working locally, we began on building the Flask app script to render the HTML as well as deliver the correct datasets per webpage. Admittedly the Flask app script is cluttered and cumbersome to the eyes. Future iterations of this website will seek to de-cluttered the script and reduce the number of saved datasets. Before deployment, the team worked on the CSS and final styling of the website. A Punk band lead singer is only as good as their eyeliner, therefore the team wanted to make sure the website looked as pretty as possible. To further prepare for deployment, the team filled the Heroku database with our disaster data and played with the connection string to ensure the Flask app deliver the correct data.

Finally, the team created a cleaned up repository for Heroku deployment. You can view the [Disaster website](https://n-disaster.herokuapp.com/).

# Repository Description
In this repository, you will find two folders containing data files, one folder with Jupyter notebooks and one folder entitled Heroku. The two data folders in the repository's main directory can be ignored. The Jupyter Notebook folder holds notebooks for data gathering, cleaning and loading as well as one notebook named EDA used to quickly visualize with Pandas and Matplotlib. The Heroku folder contains three subsequent folders and the Flask App script. The data folder holds all the data files that were loaded into AWS and Heroku's database. The static folder holds the CSS and JavaScript code for the website, while the templates folder contains the HTML files. We created a separate [repository](https://github.com/nitchon/disasters) for Heroku to use for deployment with the requisite files, such as text files for requirements and runtime.

# Project Status
While project week is over, our website is far from finished. After some helpful feedback from staff and instructors, we have targeted updates to improve the website. The first improvement involves the data analysis. While raw numbers are great, displaying and visualizing raw numbers may not give an accurate depiction. Taking the raw numbers of deaths for instance. With a large population, it make senses China suffers many deaths. But more interesting is the proportion of deaths of the overall population in a country. This would illuminate on which country is suffering the most in terms for deaths as a result of natural disasters. To that end, creating a control slider that would return deaths as a percentage of a country's population for that specific year is in the works.

Another revision to the visualizations includes creating an event listener/handler that would update legends on choropleth maps depending on which layer is selected. We were unable to figure it out before the deadline, but it would make the maps more comprehensible. In addition, scatter plots exploring GDP per capita/CO2 emissions per capita versus death rates could be a worthwhile endeavor for more conclusions.

The second improvement involves politics. We can sit here listing policies addressing climate change that we haven't all heard before, but it does not help that a significant portion of the United States population believe climate change is not real. It does not help that more than half the Senate, including two Democratic senators, want nothing to do with dismantling our current energy sources and leaning into renewables. Therefore, our policy is quite simple: vote. In a future iteration of the website, we would like to include resources for climate change legislation as well as a candidate spotlight highlighting key races across the country each year. As budding data scientists, we would like to paint a brighter picture for you, but unless leadership and public opinion changes, we are stuck in an endless cycle of despair. Every vote counts, every vote matters.




## Acknowledgements

CRED & UCLouvain. (2022). EM-DAT [Dataset]. In International Disaster Database. https://public.emdat.be/
Hannah Ritchie and Max Roser (2014) - "Natural Disasters". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/natural-disasters' [Online Resource]  
The World Bank, World Development Indicators (2012). GNI per capita, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/NY.GNP.PCAP.CD  
The World Bank, World Development Indicators (2012). GDP per capita, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/NY.GDP.PCAP.CD  
The World Bank, World Development Indicators (2012). CO2 per capita, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/EN.ATM.CO2E.PC  
The World Bank, World Development Indicators (2012). Population, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/SP.POP.TOTL  
United Nations, Department of Economic and Social Affairs, Population Division (2022). World Population Prospects 2022, Online Edition
https://public.emdat.be/about
data.worldbank.orgdata.worldbank.org
GNI per capita, Atlas method (current US$) | Data  
GNI per capita, Atlas method (current US$) from The World Bank: Data  
data.worldbank.orgdata.worldbank.org  



