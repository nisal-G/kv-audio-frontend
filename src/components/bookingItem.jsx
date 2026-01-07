export default function BookingItem(props) {

    const { item, qty } = props;    


    return (
        <div className="w-full flex flex-row items-center">
            <span>{item}</span> X
            <span> {qty}</span>
        </div>
    )
}
