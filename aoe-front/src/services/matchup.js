import axios from '../utils/apiClient';

const baseUrl = '/api/matchup';
const updateUrl = '/api/matchup/update';

const getMatchup = async (civs) => {
  const res = await axios.get(baseUrl, { params: civs });
  return res.data;
};

const updateMatchup = async (yourCiv, oppCiv, oppComp) => {
  const res = await axios.get(updateUrl, { params: { yourCiv, oppCiv, oppComp } });
  console.log(res.data)
  return res.data;
};

export default { getMatchup, updateMatchup };