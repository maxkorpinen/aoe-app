import axios from '../utils/apiClient';

const baseUrl = '/api/matchup';
const updateUrl = '/api/matchup/update';

const getMatchup = async (oppCivId, oppAge) => {
  const res = await axios.get(baseUrl, { params: { oppCivId: oppCivId, oppAge: oppAge } });
  return res.data;
};

const updateMatchup = async (yourCiv, oppCiv, oppComp, yourAge, oppAge) => {
  const res = await axios.get(updateUrl, { params: { yourCiv, oppCiv, oppComp, yourAge, oppAge } });
  return res.data;
};

export default { getMatchup, updateMatchup };