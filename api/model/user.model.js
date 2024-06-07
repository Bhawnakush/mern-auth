import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/images/view;_ylt=Awrx_esI5GJmqBUwoba9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzFmYmZmYjg0YzUwODVlMTNiMjMyY2Q3OWQ3M2NjZjg3BGdwb3MDNDkEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dprofile%2Bimaegs%26type%3DE210IN714G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D49&w=1200&h=1200&imgurl=www.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile.png&rurl=https%3A%2F%2Fwww.pngall.com%2Fprofile-png%2Fdownload%2F51635&size=63.2KB&p=profile+imaegs&oid=1fbffb84c5085e13b232cd79d73ccf87&fr2=piv-web&fr=mcafee&tt=Profile+-+PNG+All+%7C+PNG+All&b=0&ni=21&no=49&ts=&tab=organic&sigr=zv7lh.VSSKZQ&sigb=Wyy6kw5Sdr0a&sigi=49KKG._7ldxE&sigt=z77Ii.jLPeAz&.crumb=XWb61YQepYM&fr=mcafee&fr2=piv-web&type=E210IN714G0",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
