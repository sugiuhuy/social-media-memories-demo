import { Component, onMount } from "solid-js";
import ChangeUsername from "~/shared/common/change-username";
import EditProfile from "~/shared/common/edit-profile";
import UploadAvatar from "~/shared/components/input/upload-avatar";
import { selectStore } from "~/stores/manage";

const PageEditAccount: Component = () => {
  const auth = selectStore((store) => store.auth!);

  onMount(() => {
    document.title = "Edit Profile";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Edit Profile";
    });
  });

  return (
    <>
      <UploadAvatar {...auth()} />
      <ChangeUsername {...auth()} />
      <EditProfile {...auth()} />
    </>
  );
};

export default PageEditAccount;
