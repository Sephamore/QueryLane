import axios from "axios"


axios.defaults.withCredentials = true

export default function Profile({id}) {
    return (
        <div>
            An account {id}
        </div>
    )
}