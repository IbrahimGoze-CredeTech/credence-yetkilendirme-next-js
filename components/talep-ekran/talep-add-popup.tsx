import { Form, Popup } from 'devextreme-react'
import { Item } from 'devextreme-react/form';
import React from 'react'

export default function TalepAddPopup({ onClose }: { onClose: () => void }) {
  function onFieldDataChanged(e: any) {
    // console.log('called');
    console.log(e.value);
  }
  return (
    <Popup title="Talep Yarat" showTitle={true} width={700} height={525}
      onHiding={onClose}>
      <Form >
        {/* <form> */}
        <Item dataField="talepTipiId" editorType="dxSelectBox"
          editorOptions={{
            onValueChanged: (e: any) => onFieldDataChanged(e)
          }}
        />
        {/* </form> */}

      </Form>
    </Popup>
  )
}
