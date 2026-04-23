import PetBlock from "@/shared/components/PetBlock/PetBlock";
import AddPetForm from "@/features/pets/components/AddPetForm";
import styles from "./AddPetPage.module.scss";

import mobileImg from "@/assets/images/addpet-mob.jpg";
import tabletImg from "@/assets/images/addpet-tab.jpg";
import desktopImg from "@/assets/images/addpet-desk.jpg";

export default function AddPetPage() {
  return (
    <section className={styles.addPetPage}>
       <PetBlock
          mobileSrc={mobileImg}
          tabletSrc={tabletImg}
          desktopSrc={desktopImg}
          alt="Pet dog"
        />
      <AddPetForm />
    </section>
  );
}
