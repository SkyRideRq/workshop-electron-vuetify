var mountedAdressData = {
  mounted() {
    const { company, adress, phone, mail } = this.data;
    this.adressData = { company, adress, phone, mail };
  },
};
export default mountedAdressData;
