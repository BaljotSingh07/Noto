import { IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonNote, IonList, IonItem, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSearchbar, IonSelect, IonSelectOption, IonIcon  } from "@ionic/react"
import { cloudDownloadSharp } from "ionicons/icons"
import { useEffect, useState } from "react"
import { ILotteryPack } from "../functions/functions"
import { getAllLottries, ILotterySelect } from "../functions/function_lottries"
import './Lottries.css'

interface ILotteryView{
    ondissmiss?: (newLottery: ILotteryPack | undefined) => any,
}

const Lottries: React.FC<ILotteryView> = ({ondissmiss}) => {
    const [lottries, setLottries] = useState<ILotterySelect[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<string | null | undefined>("")
    const [costFilter, setCostFilter] = useState<number | null>()
    const [costs, setCosts] = useState<number[]>([])

    useEffect(() => {
        const lottries = getAllLottries()
        const costList:number[] = []
        lottries.forEach(e => {
            if(!costList.includes(e.cost))
                costList.push(e.cost)
        })
        setLottries(lottries)
        setCosts(costList)
    },[])

    return (
        <>
        <IonHeader>
        <IonToolbar>
          {ondissmiss ? 
          <IonButton onClick={() => {ondissmiss(undefined)}} slot='end' size={'small'} color={'danger'} fill={'clear'}>Cancel</IonButton>
            :
            <></>
          }
          <IonTitle>Lottries</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar debounce={200} onIonChange={(e) => setFilter(e.target.value)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent >
         <IonList>
            <IonSelect onIonChange={(e) => setCostFilter(e.detail.value)} placeholder="Cost filter">
                <IonSelectOption value={null}>All</IonSelectOption>
                {costs.map((e,i) => <IonSelectOption key={i} value={e}>$ {e}</IonSelectOption>)}
            </IonSelect>
            <IonItem lines="none">
                <IonNote><IonIcon icon={cloudDownloadSharp}/>11/25/2022</IonNote>
            </IonItem>
            {lottries.map((e,i) =>
            <div key={i} >
            {(!filter || e.name.toLowerCase().includes(filter.toLowerCase())) && (!costFilter || e.cost === costFilter) ? 
            <IonItem detail={ondissmiss ? true : false} onClick={() => {if(ondissmiss) ondissmiss({cost: e.cost, cur: 0, name: e.name, prev: 0, sale: 0})}}>
                <IonCard >
                    <IonImg className="lottery-img" src={e.img}></IonImg>
                    <IonCardHeader className="card-header">
                        <IonCardSubtitle color={'dark'}>${e.cost}</IonCardSubtitle>
                        <IonCardTitle color={"dark"}>{e.name}</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
            </IonItem>
            :
            <></>
            }
            </div>
        )}

         </IonList>
      </IonContent>
  </>
    )
}

export default Lottries