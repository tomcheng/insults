const ENTRY_KEY = "insults";

const validateBuckets = buckets => {
  let hasMissingBucket = false;

  const checkForMissingBuckets = arr => {
    arr.forEach(i => {
      const item = i.value || i;
      const matches = (item.match(/\[.*?]/g) || [])
        .map(m => m.replace(/[\[\]]/g, ""));

      matches.forEach(match => {
        if (!buckets[match]) {
          hasMissingBucket = true;
        } else {
          checkForMissingBuckets(buckets[match]);
        }
      });
    });
  };

  checkForMissingBuckets(buckets[ENTRY_KEY]);

  return !hasMissingBucket;
};

export default validateBuckets;
