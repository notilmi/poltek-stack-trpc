import { type Metadata } from "next";
import BackButton from "../../_components/back-button";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Posltack | Terms of Service",
};

function TOSPage() {
  return (
    <div className="prose lg:prose-lg mx-auto h-screen max-w-screen-md p-4 py-12 text-justify">
      <BackButton className="mb-4" />
      <h1>Terms Of Service</h1>
      <p>Last updated: March 08, 2025</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at
        congue massa, in tincidunt odio. Nulla eget sodales nisi, nec placerat
        turpis. Nam aliquet placerat lorem, sit amet pulvinar urna bibendum ac.
        Pellentesque nec semper dolor. Ut tellus justo, bibendum vitae
        scelerisque in, tristique in justo. Quisque accumsan turpis vitae dolor
        sodales iaculis. Nam hendrerit libero vitae lacus volutpat, venenatis
        porttitor magna ornare. Donec tempor pulvinar aliquam. Duis varius,
        felis eget congue dapibus, nisi ipsum sagittis velit, tincidunt pretium
        nisl metus et ipsum. Sed euismod ultrices sodales. Suspendisse at mattis
        purus. Aenean cursus volutpat nulla, ut tempor nulla.
      </p>
      <p>
        In lectus velit, pharetra nec feugiat id, faucibus sed diam. Ut cursus
        dignissim tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Integer vestibulum magna nec enim aliquet, ac luctus justo
        tincidunt. Proin pulvinar enim quis nunc iaculis molestie. Vivamus
        aliquet, ex a luctus dictum, leo purus imperdiet leo, et bibendum orci
        quam eu ante. Duis tincidunt tempor vehicula. Nulla in efficitur diam.
        Morbi sit amet scelerisque eros.
      </p>
      <p>
        Proin accumsan ante id dictum sodales. Quisque suscipit ipsum in mauris
        dignissim rhoncus. Vestibulum ac nibh in nunc lobortis viverra non non
        odio. Pellentesque ultricies eros a pretium euismod. Pellentesque
        finibus eleifend consectetur. Cras viverra nec ante quis ultrices.
        Pellentesque molestie augue ac lacinia commodo. Ut in consequat purus,
        ut sollicitudin nibh. Phasellus porta, metus vitae convallis posuere,
        ante lacus gravida leo, sit amet scelerisque velit ipsum a urna. Mauris
        eu magna enim. Sed ac tellus metus. Nam faucibus nisi vel faucibus
        rhoncus. Sed varius libero in orci tristique, vel aliquet ipsum
        pulvinar. Sed viverra metus ut dolor ultricies, et aliquam orci
        ullamcorper. Nam id dui commodo, venenatis tortor eu, vehicula libero.
      </p>
    </div>
  );
}

export default TOSPage;
