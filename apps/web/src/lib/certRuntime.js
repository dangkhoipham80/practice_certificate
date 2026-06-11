import { isDragDropQuizReady } from './dragDropUiFormat';
import { isHotAreaQuizReady } from './hotAreaUiFormat';

export function getQuizQuestions(cert) {
  return cert.questions.filter((question) => {
    if (question.quizEligible === false) return false;
    if (question.choices?.length) return true;
    return isDragDropQuizReady(question.uiConfig) || isHotAreaQuizReady(question.uiConfig);
  });
}

export function isCertReady(cert) {
  return cert.status === 'Ready' && getQuizQuestions(cert).length > 0;
}
