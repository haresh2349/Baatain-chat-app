import Styles from './chat-list.module.css'
export const ChatList = () => {
  return (
    <div className={Styles.c_l_container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 20]?.map((item, index) => {
        return <ChatListItemCard active={index == 1} />
      })}
    </div>
  )
}
type ChatlistItemCardPropsType = {
  active: boolean
}

export const ChatListItemCard: React.FC<ChatlistItemCardPropsType> = ({
  active,
}) => {
  return (
    <div
      className={`${active ? Styles.activeCard : ''} ${Styles.c_i_c_wrapper}`}
    >
      <div className={Styles.c_i_c_wrapper_left}>
        <div className={Styles.c_i_c_profile}>
          <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1009013439.1731438406&semt=ais_hybrid" />
        </div>
        <div className={Styles.c_i_c_name}>
          <p>Haresh Solanki</p>
          <span>
            I am haresh solaki ksdnfkjsd ksdnfkjsf skdfnsjk sdfkjsnf
            sdkfsndfksdn s
          </span>
        </div>
      </div>
      <div className={Styles.c_i_c_wrapper_right}>
        <p>12:10</p>
        <span>4</span>
      </div>
    </div>
  )
}
