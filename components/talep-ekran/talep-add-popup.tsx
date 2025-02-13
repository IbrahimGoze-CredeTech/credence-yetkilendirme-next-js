/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Popup } from 'devextreme-react'
import { Item } from 'devextreme-react/form';
import React from 'react'

export default function TalepAddPopup({ onClose }: { onClose: () => void }) {
  // function onFieldDataChanged(e: any) {
  // }
  return (
    <Popup height={525} onHiding={onClose} showTitle={true} title="Talep Yarat"
      width={700}>
      <Form >
        {/* <form> */}
        <Item dataField="talepTipiId" editorOptions={{
            // onValueChanged: (e: any) => onFieldDataChanged(e)
          }}
          editorType="dxSelectBox"
        />
        {/* </form> */}

      </Form>
    </Popup>
  )
}
