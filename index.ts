import express, { type Application } from 'express';
import bodyParser from 'body-parser';
import monitorRoutes from './src/routes/monitor_routes';

const app: Application = express();

app.use(bodyParser.json());

// Routes
app.use('/api', monitorRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const pinger = async (links : string[]) => {
    const stats = await Promise.all(links.map( async (link) =>{
        const start =  performance.now()
        const res = await fetch(link)
        const end = performance.now()
        return {
          'url' : link,
          'status' :  res.status,
          'latency' : end -  start 
        }
    }))

    return stats
}

  const pingingService = async (PORT : number) =>{
    const res = await fetch(`localhost:${PORT}/api/monitor`,{
      method : 'GET'
    })
    const data = await res.json()
    const links =  (data.results.map((value : any) =>{
      return value.url
    }))

    const stats = await pinger(links)
    console.log(stats)
  }
  

  pingingService(PORT)
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});