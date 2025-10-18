import Styles from "../../styles/Styles";

const ProfileSection = () => {
    return (
        <div className="flex items-center gap-x-1">
            <img src="/user-profile.svg"/>
            <div>
                <p className="text-sm roboto-bold leading-none">Juan dela Cruz</p>
                <p className="text-xs roboto-italic leading-none">@juandelacruz01</p>
            </div>
        </div>
    );
};

export default ProfileSection;