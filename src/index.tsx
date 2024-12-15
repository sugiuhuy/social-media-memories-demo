/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import "~/assets/styles/app.css";
import App from "./App";
import PageHome from "./pages";
import GuestLayout from "./pages/account/guest/layout";
import PageLogin from "./pages/account/guest/login";
import PageForgotPassword from "./pages/account/guest/password/forgot";
import PageRegister from "./pages/account/guest/register";
import PageSetting from "./pages/account/setting";
import PageChangePassword from "./pages/account/setting/change-password";
import PageChangePrivacy from "./pages/account/setting/change-privacy";
import PageCollections from "./pages/account/setting/collections";
import PageCreateCollection from "./pages/account/setting/collections/create";
import PageEditCollection from "./pages/account/setting/collections/edit";
import PageEditAccount from "./pages/account/setting/edit-account";
import SettingLayout from "./pages/account/setting/layout";
import { PageBlockedAccounts, PageMutedAccounts, PagePersonalizedAccounts } from "./pages/account/setting/manage/manage-accounts";
import PagePushNotifications from "./pages/account/setting/manage/push-notifications";
import PageTagsMentions from "./pages/account/setting/manage/tags-mentions";
import PageSwitchAppearance from "./pages/account/setting/switch-appearance";
import PageVerifyingAccount from "./pages/account/setting/verifying-account";
import PageActivities from "./pages/activities";
import ActivitiesLayout from "./pages/activities/layout";
import PageChat from "./pages/chat";
import ChatLayout from "./pages/chat/layout";
import PageChatMessages from "./pages/chat/messages";
import PageExplorePosts from "./pages/explore";
import PageExploreHastags from "./pages/explore/hastags";
import ExploreLayout from "./pages/explore/layout";
import PageExploreUsers from "./pages/explore/users";
import PageNotFound from "./pages/not-found";
import PagePostDetails from "./pages/post";
import ProfileLayout from "./pages/profile/layout";
import LoadProfileData from "./pages/profile/load-profile-data";
import { PageProfilePosts, PageProfileSavedPosts, PageProfileTaggedPosts } from "./pages/profile/posts";
import Contexts from "./providers/contexts";
import Protected from "./routes/protected";
import Restricted from "./routes/restricted";

const root = document.getElementById("root");
render(
  () => (
    <Contexts>
      <Router root={App}>
        <Route path="/" component={Protected}>
          <Route path="/" component={PageHome} />
          <Route path="/post/:post" component={PagePostDetails} />
          <Route path="/explore" component={ExploreLayout}>
            <Route path="/" component={PageExplorePosts} />
            <Route path="users" component={PageExploreUsers} />
            <Route path="hastags">
              <Route path="/" component={PageExploreHastags} />
              <Route path=":hastag" component={PageExplorePosts} />
            </Route>
          </Route>
          <Route path="/activities" component={ActivitiesLayout}>
            <Route path=":activity?" component={PageActivities} />
          </Route>
          <Route path="/chat" component={ChatLayout}>
            <Route path="/" component={PageChat} />
            <Route path=":conversation" component={PageChatMessages} />
          </Route>
          <Route path="/:username" component={LoadProfileData} matchFilters={{ username: /@(\w+)/ }}>
            <Route path="/" component={ProfileLayout}>
              <Route path="/" component={PageProfilePosts} />
              <Route path="tagged" component={PageProfileTaggedPosts} />
              <Route path="saved" component={PageProfileSavedPosts} />
            </Route>
          </Route>
          <Route path="/account" component={SettingLayout}>
            <Route path="/" component={PageSetting} />
            <Route path="edit" component={PageEditAccount} />
            <Route path="password" component={PageChangePassword} />
            <Route path="privacy" component={PageChangePrivacy} />
            <Route path="manage">
              <Route path="block" component={PageBlockedAccounts} />
              <Route path="mute" component={PageMutedAccounts} />
              <Route path="personalize" component={PagePersonalizedAccounts} />
              <Route path="push_notifications" component={PagePushNotifications} />
              <Route path="tags_mentions" component={PageTagsMentions} />
            </Route>
            <Route path="collections">
              <Route path="/" component={PageCollections} />
              <Route path="create" component={PageCreateCollection} />
              <Route path="edit/:collection">
                <Route path="/" component={PageEditCollection} />
              </Route>
            </Route>
            <Route path="verifying" component={PageVerifyingAccount} />
            <Route path="switch_appearance" component={PageSwitchAppearance} />
          </Route>
        </Route>
        <Route path="/" component={Restricted}>
          <Route path="/account" component={GuestLayout}>
            <Route path="login" component={PageLogin} />
            <Route path="register" component={PageRegister} />
            <Route path="password/forgot" component={PageForgotPassword} />
          </Route>
        </Route>
        <Route path="*404" component={PageNotFound} />
      </Router>
    </Contexts>
  ),
  root!,
);
