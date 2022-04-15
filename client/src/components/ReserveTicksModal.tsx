import React, { ReactElement } from 'react'

interface ModalProps {
    visible: boolean
    title: string
    footer: ReactElement
    onClose: () => void
}

const ReserveTicksModal = ({
    visible = false,
    title = '',
    footer,
    onClose,
}: ModalProps) => {
  
React.useEffect(() => {
    
})

if (!visible) return null;

return <div className="modal" onClick={onClose}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-close" onClick={onClose}>
            &times;
            </span>
            </div>
            <div className="modal-body">
            <div className="modal-content">
                <input type="text" name="name" placeholder="Имя" className="modal-content-input"/>
                <input type="text" name="limit" placeholder="Кол-во мест"/>
            </div>
            </div>
            {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
}




export default ReserveTicksModal