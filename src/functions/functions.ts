import dayjs from "dayjs";
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore";
import { ILotteryPackEnding } from "./functions_lotterypackSettings";

export type ILotteryPack = {
  name: string;
  prev: number;
  cur: number;
  sale: number;
  cost: number;
  endding ?: number;
} | null;

export interface ISummary {
  lotto: number;
  online: number;
  total: number;
}

export interface IShift {
  date: dayjs.Dayjs ;
  lottos: Array<ILotteryPack>;
  summaray: ISummary;
  notes: string;
}

export interface IFirestoreShift{
  Date: Date;
  Lottos: Array<ILotteryPack>;
  Summary: ISummary;
  Notes: string;
}

export interface IHistory extends ISummary {
  date: dayjs.Dayjs;
  notes: string;
}

interface IMockDatabase {
  data: Array<IShift>;
}

function getLotteryEnding(endings: Array<ILotteryPackEnding>){

}

export async function getPrevShiftByDate(date: dayjs.Dayjs){
  const previousDate = date.subtract(1, "day").format("MM-DD-YYYY");
  // let shift = mockDatabase.data.find((e) => e.date.isSame(previousDate, "day"));
  // if (shift) {
  //   const newShift: IShift = { date: date, summaray: { lotto: 0, online: 0, total: 0 }, notes: "Cash: $", lottos: [] };
  //   shift.lottos.forEach((e) => {
  //     if (!e) {
  //       newShift.lottos.push(null);
  //     } else {
  //       newShift.lottos.push({ name: e.name, cost: e.cost, cur: e.cur, prev: e.cur, sale: 0 });
  //     }
  //   });
  //   return newShift;
  // } else {
  //   shift = { date: date, lottos: [], notes: "Cash : $", summaray: { lotto: 0, online: 0, total: 0 } };
  //   return shift;
  // }

  const prevDocData = (await getDoc(doc(db, 'Shifts', previousDate))).data()
  let newShift: IShift = { date: date, lottos: [], notes: "Cash: $", summaray: { lotto: 0, online: 0, total: 0 } };
  if (prevDocData) {
    prevDocData.Lottos.forEach((e: ILotteryPack) => {
      if (!e) {
        newShift.lottos.push(null);
      } else {
        newShift.lottos.push({ name: e.name, cost: e.cost, cur: e.cur, prev: e.cur, sale: 0 });
      }
    });
  }
  return newShift
}

export async function getShiftByDate(date: dayjs.Dayjs){
  // const shift: IShift | undefined = mockDatabase.data.find((obj) => {
  //   return obj.date.isSame(date);
  // });
  return getDoc(doc(db, 'Shifts', date.format('MM-DD-YYYY')))
  .then(doc => {
    const docData = doc.data()
    if(!docData) return undefined
    const returnData: IShift = {date : dayjs(docData.Date.toDate()), lottos : docData.Lottos, notes : docData.Notes, summaray : docData.Summary}
    return returnData
  })
}

export async function setShiftByDate(date: dayjs.Dayjs, newShift: IShift) {
  // let shift = getShiftByDate(date);

  // if (shift) {
  //   shift.lottos = newShift.lottos;
  //   shift.summaray = newShift.summaray;
  //   shift.notes = newShift.notes;
  // } else {
  //   mockDatabase.data.unshift(newShift);
  // }
  let ret = false;
  const data: IFirestoreShift = {Date: newShift.date.toDate(), Lottos: newShift.lottos, Notes: newShift.notes, Summary: newShift.summaray}
  await setDoc(doc(db, 'Shifts', newShift.date.format("MM-DD-YYYY")), data).then(() => {
    ret = true
  })
  .catch(() => {
    ret = false
  })
  return ret
}

export async function updateOnlineByDate(date: dayjs.Dayjs, newOnlineSale: number, newTotalSale: number){
  // const shift = await getShiftByDate(date);
  // if (shift) {
  //   shift.summaray.online = newSale;
  //   shift.summaray.total = shift.summaray.lotto + newSale;
  //   return { ...shift.summaray, notes: shift.notes, date: shift.date };
  // }
  // return false;

  return setDoc(doc(db, 'Shifts', date.format("MM-DD-YYYY")), {Summary: {online : newOnlineSale, total: newTotalSale}}, {merge: true})
  .then(() => true)
  .catch(() => false)
}

export async function getHistory() {
  const returnVal: Array<IHistory> = [];
  // mockDatabase.data.forEach((e) => {
  //   returnVal.push({ date: e.date, lotto: e.summaray.lotto, online: e.summaray.online, total: e.summaray.total, notes: e.notes });
  // });
  const q = query(collection(db, 'Shifts'), orderBy('Date', 'desc') ,limit(5))
  return getDocs(q)
  .then(docs => {
    docs.docs.forEach((e) => {
      const doc = e.data()
      returnVal.push({ date: dayjs(doc.Date.toDate()), lotto: doc.Summary.lotto, online: doc.Summary.online, total: doc.Summary.total, notes: doc.Notes })
    })
    return returnVal
  })
  .catch(() => {
    return returnVal
  })
  
}
