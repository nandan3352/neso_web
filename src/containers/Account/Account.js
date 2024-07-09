import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import PersonalInfoFacebook from "./LoginViaFacebook/PersonalInfoFacebook";
import PersonalInfoFirebase from "./LoginViaFirebase/PersonalInfoFirebase";
import PersonalInfoGoogle from "./LoginViaGoogle/PersonalInfoGoogle";
import imageCompression from "browser-image-compression";
import AddUserAddressDialog from "./Dialogs/AddUserAddressDialog";
import UserProfileImage from "../../components/ServiceComponent/UserProfileImage";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { databaseOnValue, databaseUpdate } from "../../Services/Database";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "100%",
    maxWidth: 764,
    padding: "0px 32px",
    paddingBottom: 50,
    boxSizing: "border-box",

    [theme.breakpoints.down(469)]: {
      padding: 0,
    },

    "& .userAccountHeader": {
      color: theme.palette.text.primary,
      padding: "48px 0px",
      fontSize: 24,
      lineHeight: "24px",
      letterSpacing: 0.18,

      [theme.breakpoints.down(769)]: {
        padding: "32px 0px",
      },

      [theme.breakpoints.down(469)]: {
        marginLeft: 16,
        padding: "16px 0px",
        fontSize: 20,
        letterSpacing: 0.15,
        fontWeight: 500,
      },
    },
  },

  userImage: {
    display: "flex",
    gridColumnGap: 32,

    [theme.breakpoints.down(469)]: {
      marginLeft: 16,
      gridColumnGap: 27,
    },

    "& .userAccountProfilePic": {
      height: 82,
      width: 82,
      minWidth: 82,

      "& img": {
        height: "100%",
        width: "100%",
        borderRadius: "100%",
      },
    },

    "& .userImageUploadButton": {
      "& .MuiButton-root ": {
        width: 92,
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      },
    },

    "& .userImageUploadInst": {
      marginTop: 12,
      maxWidth: 383,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: 0.25,
      color: theme.palette.text.secondary,

      [theme.breakpoints.down(469)]: {
        marginTop: 11,
      },
    },
  },

  userPersonalInfo: {
    marginTop: 56,
    width: "100%",
    maxWidth: 764,
    margin: "auto",
    border: "1px solid rgba(var(--theme-divider))",
    boxSizing: "border-box",
    padding: "32px 48px 30px 38px",

    [theme.breakpoints.down(769)]: {
      marginTop: 32,
    },

    [theme.breakpoints.down(469)]: {
      marginTop: 31,
      padding: 0,
      border: "none",
    },

    "& .userPersonalInfoHeader": {
      color: theme.palette.text.primary,
      marginLeft: 10,
      fontSize: 20,
      lineHeight: "24px",
      letterSpacing: 0.15,
      fontWeight: 500,

      [theme.breakpoints.down(469)]: {
        marginLeft: 16,
      },
    },
  },

  userBillingAddress: {
    marginTop: 24,
    width: "100%",
    maxWidth: 764,
    margin: "auto",
    border: "1px solid rgba(var(--theme-divider))",
    boxSizing: "border-box",
    padding: "32px 48px",

    [theme.breakpoints.down(469)]: {
      border: "none",
      padding: "32px 16px 40px 16px",
      marginTop: 0,
    },

    "& .userBillingAddressHeader": {
      fontSize: 20,
      color: theme.palette.text.primary,
      lineHeight: "24px",
      letterSpacing: 0.15,
      fontWeight: 500,
    },

    "& .MuiButton-root ": {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },

    "& .userBillingName": {
      marginTop: 32,
      fontSize: 16,
      color: theme.palette.text.primary,
      lineHeight: "24px",
      letterSpacing: 0.15,
      textTransform: "capitalize",

      [theme.breakpoints.down(469)]: {
        marginTop: 16,
      },
    },

    "& .billingUserAddress": {
      marginTop: 24,
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: 0.15,
      fontWeight: 400,
      color: theme.palette.text.secondary,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      [theme.breakpoints.down(469)]: {
        marginTop: 8,
      },

      "& .billingUserAddressChild": {
        width: 290,
        wordBreak: "break-word",

        [theme.breakpoints.down(469)]: {
          width: 230,
        },
      },
    },
  },

  addUserAddress: {
    marginTop: 38,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& .addAddressStyle": {
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: 0.15,
      color: theme.palette.text.secondary,
    },

    "& .MuiButton-root ": {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
  },
}));

export default function Account(props) {
  const user = props.user;
  const [userBillAddressOpen, setUserBillAddressOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userAddress, setUserAddress] = useState({
    name: "",
    number: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    address: "",
  });
  const [isUserAddressAvailable, setIsUserAddressAvailable] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const classes = useStyles();

  useEffect(() => {
    document.title = "Account | Neso Academy";
    if (!user) return;

    return databaseOnValue(`/Users/${user.uid}/billaddress`, (snapshot) => {
      if (!snapshot) return;
      const result = snapshot.val();
      if (result) {
        setUserAddress(result);
        setIsUserAddressAvailable(true);
      }
    });
  }, [user]);

  const updateInDatabase = async (url) => {
    try {
      databaseUpdate(`Users/${user.uid}`, {
        imgURL: url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = async (e) => {
    try {
      if (e.target.files.length === 0) return;

      setUploading(true);

      const image = e.target.files[0];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 200,
        useWebWorker: true,
      };
      const compressedImg = await imageCompression(image, options);

      const imageRef = ref(getStorage(), `userProfilePics/${user.uid}`);

      await uploadBytes(imageRef, compressedImg);
      const imageUrl = await getDownloadURL(imageRef);
      const User = getAuth().currentUser;
      updateProfile(User, {
        photoURL: imageUrl,
      })
        .then(() => {
          User.reload();
          setUploading(false);
          updateInDatabase(imageUrl);
        })
        .catch((err) => {
          setUploading(false);
          console.log(err);
        });
      setImgURL(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const profilePictureClickHandler = () => {
    var input = document.getElementById("profilePictureInput");
    input.click();
  };

  const addUserAddressClickHandler = () => setUserBillAddressOpen(true);
  const onClose = () => setUserBillAddressOpen(false);

  if (!user) {
    return null;
  }

  const UserAddress = () => {
    return (
      <>
        <div className="userBillingName">{userAddress.name}</div>
        <div className="billingUserAddress">
          <div className="billingUserAddressChild">
            {userAddress.number} <br /> {userAddress.address} <br />
            {userAddress.city}, {userAddress.state} <br />
            {userAddress.pincode} <br />
            {userAddress.country}
          </div>
          <div>
            <Button variant="outlined" onClick={addUserAddressClickHandler}>
              edit
            </Button>
          </div>
        </div>
      </>
    );
  };

  const AddUserAddress = () => {
    return (
      <div className={classes.addUserAddress}>
        <div className="addAddressStyle">Add a new address</div>
        <div>
          <Button variant="outlined" onClick={addUserAddressClickHandler}>
            add
          </Button>
        </div>
      </div>
    );
  };

  const provider = user.providerData[0].providerId

  return (
    <div className={classes.root}>
      <div className="userAccountHeader">Account</div>
      <div className={classes.userImage}>
        <div className="userAccountProfilePic">
          <UserProfileImage
            img={imgURL || user.photoURL}
            width={82}
            uid={user.uid}
            name={user.displayName}
          />
        </div>
        <div>
          <div className="userImageUploadButton">
            <Button variant="outlined" onClick={profilePictureClickHandler}>
              {uploading ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                "upload"
              )}
            </Button>
            <input
              type="file"
              hidden="hidden"
              id="profilePictureInput"
              accept="image/*"
              onChange={changeHandler}
            />
          </div>
          <div className="userImageUploadInst">
            Your profile picture shows up in comment section and Neso Academy
            Forum.
          </div>
        </div>
      </div>

      <div className={classes.userPersonalInfo}>
        <div className="userPersonalInfoHeader">Personal info</div>

        {provider === GoogleAuthProvider.PROVIDER_ID ? (
          <PersonalInfoGoogle user={user} />
        ) : provider === FacebookAuthProvider.PROVIDER_ID ? (
          <PersonalInfoFacebook user={user} />
        ) : (
          <PersonalInfoFirebase user={user} />
        )}
      </div>

      <div className={classes.userBillingAddress}>
        <div className="userBillingAddressHeader">Billing Address</div>
        {isUserAddressAvailable ? <UserAddress /> : <AddUserAddress />}
      </div>

      <AddUserAddressDialog
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        setIsUserAddressAvailable={setIsUserAddressAvailable}
        onClose={onClose}
        userBillAddressOpen={userBillAddressOpen}
      />
    </div>
  );
}
