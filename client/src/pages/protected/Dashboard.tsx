import React, {useEffect, useState} from "react"
import Header from "../../components/Header"
import LargeButtonCard from "../../components/LargeButtonCard"
import SmallButtonCard from "../../components/SmallButtonCard"
import GraphVisualization from "../../components/GraphVisualization"
import axios from "axios"

interface ApiDataProps {
    username: string,
    graphData: []
}
export default function Dashboard(){
    const [apiData, setApiData] = useState<ApiDataProps>({
        username: '',
        graphData: []
    })

    const [graphComponent, setGraphComponent] = useState<string>("totalIdeas")
    const [selectedComponent, setSelectedComponent] = useState<boolean[]>([true,false,false])
    const [graphDescription, setGraphDescription] = useState<string>("")

    //gets csfr authentication cookie
    function getCookie(name:string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim()
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                }
            }
        }
        return cookieValue
    }

    useEffect(() => {
        document.title = "Dashboard"
        const csrftoken = getCookie('csrftoken')
        axios.get('/api/dashboard/', {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
        .then(res => {
            setApiData(res.data)
            console.log(apiData)
        })
        .catch(err => {
            console.error("Error fetching profile data:", err)
        })

    }, [])

    //handles which graph should be displayed based on currently clicked SmallButtonCard
    function displayData(componentID:string){
        setGraphComponent(componentID)
    }

    //gets caption from current graph being displayed
    function getGraphDescription(data:string){
        setGraphDescription(data)
    }

    //updates styling of currently selected SmallButtonCard (uses current render ordering for indexes)
    function updateComponentStyling(component:string){
        if(component === "totalIdeas"){
            setSelectedComponent([true,false,false])
        }
        else if(component === "location"){
            setSelectedComponent([false,true,false])
        }
        else{
            setSelectedComponent([false,false,true])
        }
    }

    function formatGraphData(){
        // pass data to graph from database
    }

    useEffect(()=>{
        //updates value of new graph to be displayed
        displayData(graphComponent)
        //updates styling of selected SmallButtonCard associated with graph
        updateComponentStyling(graphComponent)
    },[graphComponent])

    return (
        <>
            <Header useCase="protected"/>
            <div className="mx-auto">
                <p className="mr-auto ml-0 mt-14 mb-10 text-2xl font-semibold text-main-color-lightgrey underline underline-offset-4">
                    {apiData.username !== '' ? "Hi, " + apiData.username : "..."}
                </p>
                <div className="flex flex-col justify-center mx-auto lg:flex-row lg: mr-8 lg:justify-start">
                    <SmallButtonCard useCase="total" graphData="1002" getComponent ={displayData}  isSelected={selectedComponent[0]}/>
                    <SmallButtonCard useCase="location" graphData="Toronto" getComponent ={displayData} isSelected={selectedComponent[1]}/>
                    <SmallButtonCard useCase="time" graphData="Monday, April 3, 2024" getComponent ={displayData} isSelected={selectedComponent[2]} />
                </div>
                <div className="flex flex-col lg:flex-row bg-accent-color-darkgreen rounded-xl p-3 mt-4 lg:p-5">
                    <div className="flex flex-col justify-center mx-auto items-center">
                        <p className="max-w-full min-w-full text-center mt-10 mb-8 text-main-color-lightgrey text-lg px-8">
                            {graphDescription}
                        </p>
                        <p className="text-xl text-main-color-lightgrey mb-12">
                            database info will go here
                        </p>
                    </div>
                    <div className="min-w-72 max-w-72 min-h-72 lg:min-w-96 lg:max-w-96 bg-main-color-lightgrey rounded-xl p-2 lg:mx-3 mx-auto">
                        <GraphVisualization key={graphComponent} useCase={`${graphComponent}`} description ={setGraphDescription}/>
                    </div>
                    <div className="w-full h-2 bg-main-color-lightgrey rounded-full my-8 lg:w-2 lg:mx-12 lg:h-auto lg:my-4" role="presentation"></div>
                    <div className="mx-auto">
                        <LargeButtonCard useCase="generate" />
                        <LargeButtonCard useCase="add" />
                        <LargeButtonCard useCase="list" />
                    </div>
                </div>
            </div>
        </>
    )
}