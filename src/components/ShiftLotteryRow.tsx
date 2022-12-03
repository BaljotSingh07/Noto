import { IonRow, IonLabel, IonCol, IonItem, IonButton, IonInput, IonIcon } from "@ionic/react";
import { addSharp, removeCircleSharp } from "ionicons/icons";
import { ILotteryPack } from "../functions/functions";

interface IShiftLotteryRow {
  LotteryPack: ILotteryPack;
  index: number;
  deleteMode: boolean;
  addNewLotteryPack: () => void;
  onCurrentLotteryNumberChange: (e: any, index: number) => void;
  addOrSubCurrentLotteryNumber: (index: number, addOrSub: "add" | "sub") => void;
  removeLotteryRow: (index: number) => void;
}

const ShiftLotteryRow: React.FC<IShiftLotteryRow> = ({ LotteryPack, index, deleteMode, addNewLotteryPack, onCurrentLotteryNumberChange, addOrSubCurrentLotteryNumber, removeLotteryRow }) => {
  function focusOnNextInput(index: number) {
    const nextInput: HTMLIonInputElement | null = document.getElementById(index + "Focus") as HTMLIonInputElement;
    nextInput.value = "";
    nextInput?.setFocus();
  }

  if (!LotteryPack) {
    return (
      <>
        <IonRow>
          <IonLabel>
            <p>{index + 1} EMPTY</p>
          </IonLabel>
        </IonRow>
        <IonButton onClick={addNewLotteryPack} className="full" expand="block" fill="clear">
          <IonIcon slot="start" icon={addSharp} />
          Add
        </IonButton>
      </>
    );
  }

  return (
    <>
      <div hidden={!deleteMode} className="overlay">
        <IonButton
          onClick={() => {
            removeLotteryRow(index);
          }}
          fill="clear">
          <IonIcon slot="icon-only" color="danger" size="large" icon={removeCircleSharp} />
        </IonButton>
      </div>
      <IonRow>
        <IonLabel>
          <p>
            {index + 1} {LotteryPack.name} - ${LotteryPack.cost}
          </p>
        </IonLabel>
      </IonRow>

      <IonRow>
        <IonCol sizeMd="5" sizeLg="5" sizeXs="3">
          <IonItem lines="none">
            <IonLabel>
              <p>{LotteryPack.prev}</p>
            </IonLabel>
          </IonItem>
        </IonCol>

        <IonCol sizeMd="3" sizeLg="3" sizeXs="9">
          <IonItem lines="none">
            <IonButton fill="clear" onClick={() => addOrSubCurrentLotteryNumber(index, "sub")}>
              -
            </IonButton>
            <IonInput
              defaultValue={200}
              onIonChange={(e) => {
                onCurrentLotteryNumberChange(e, index);
              }}
              placeholder={LotteryPack.prev.toString()}
              clearOnEdit
              size={200}
              id={index + "Focus"}
              onKeyUp={(e) => {
                if (e.code === "Enter") focusOnNextInput(index + 1);
              }}
              class="current-lottery-label"
              value={LotteryPack.cur}></IonInput>
            <IonButton onClick={() => addOrSubCurrentLotteryNumber(index, "add")}>+</IonButton>
          </IonItem>
        </IonCol>

        <IonCol>
          <IonItem lines="none">
            <IonLabel slot="end">$ {LotteryPack.sale}</IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
    </>
  );
};

export default ShiftLotteryRow;
