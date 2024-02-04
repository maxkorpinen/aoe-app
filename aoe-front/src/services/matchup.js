import axios from '../utils/apiClient';

const baseUrl = '/api/matchup';
const updateUrl = '/api/matchup/update';

const getMatchup = async (civs) => {
  //console.log('civs:', civs)
  const res = await axios.get(baseUrl, { params: civs });
  return res.data;
};

const updateMatchup = async (oppComp, yourCiv) => {
  const res = await axios.get(updateUrl, { params: { oppComp, yourCiv } });
  return res.data;
};

export default { getMatchup, updateMatchup };