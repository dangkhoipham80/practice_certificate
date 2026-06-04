/** Stable id used by the API (matches migrate script: questionId ?? sortOrder + 1). */
export function getQuestionExternalId(question, index) {
  return question.questionId ?? index + 1;
}

export function apiQuestionToLocal(apiQ) {
  return {
    topic: apiQ.topic,
    domainId: apiQ.domainId,
    questionId: apiQ.questionId,
    images: apiQ.images ?? [],
    explanation: apiQ.explanation ?? undefined,
    quizEligible: apiQ.quizEligible,
    type: apiQ.type,
    choices: apiQ.choices ?? [],
    correct: apiQ.correct ?? [],
    multiple: apiQ.multiple,
    text: apiQ.text,
    questionKind: apiQ.questionKind,
    warn: apiQ.warn ?? undefined,
    uiConfig: apiQ.uiConfig ?? {},
    questionTypeId: apiQ.questionTypeId ?? null,
    questionTypeSlug: apiQ.questionTypeSlug ?? null,
    questionTypeLabel: apiQ.questionTypeLabel ?? null,
  };
}
