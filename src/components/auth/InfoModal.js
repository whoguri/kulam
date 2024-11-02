import Modal from "../Modal";

export default function InfoModal({ onClose, data = {} }) {

    console.log(data)
    return (<Modal title={data.name || data.userName} maxWidth="max-w-[600px]" onClose={onClose}>
        <div className="grid grid-cols-1 gap-y-4 font-semibold md:text-xl text-base" >
            {data.name && <div>Name: <span className="font-normal">{data.name}</span></div>}
            {data.userName && <div>User Name: <span className="font-normal">{data.userName}</span></div>}
            {data.email && <div>Email: <span className="font-normal">{data.email}</span></div>}
            {data.phone && <div>Phone: <span className="font-normal">{data.phone}</span></div>}
        </div>
    </Modal>)
}